import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateSchedule, SchedulingInput } from "@/lib/gemini";

// POST /api/schedule/generate
// Manual trigger only (per locked decision: no auto-regeneration on task edits).
// Reads pending tasks + today's calendar events for the user, calls Gemini,
// persists the returned ScheduleBlocks, and returns them to the client.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = (session.user as any).id as string;

  const body = await req.json().catch(() => ({}));
  const userFreeTextContext: string | undefined = body.context;

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const [tasks, calendarEvents] = await Promise.all([
    prisma.task.findMany({
      where: { userId, status: { not: "DONE" } },
      orderBy: { dueDate: "asc" },
    }),
    prisma.calendarEvent.findMany({
      where: {
        userId,
        startTime: { gte: startOfDay },
        endTime: { lte: endOfDay },
      },
    }),
  ]);

  const input: SchedulingInput = {
    now: now.toISOString(),
    tasks: tasks.map((t) => ({
      id: t.id,
      title: t.title,
      dueDate: t.dueDate?.toISOString() ?? null,
      estimatedDuration: t.estimatedDuration,
      priority: t.priority,
      difficulty: t.difficulty,
      importance: t.importance,
      category: t.category,
      aiContextNotes: t.aiContextNotes,
    })),
    calendarEvents: calendarEvents.map((e) => ({
      id: e.id,
      title: e.title,
      startTime: e.startTime.toISOString(),
      endTime: e.endTime.toISOString(),
    })),
    userFreeTextContext,
  };

  let result;
  try {
    result = await generateSchedule(input);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to generate schedule", detail: err.message },
      { status: 502 }
    );
  }

  // Clear any previous AI-generated blocks for today before inserting new ones,
  // since "Regenerate" should replace, not append.
  await prisma.scheduleBlock.deleteMany({
    where: { userId, generatedByAi: true, date: { gte: startOfDay, lte: endOfDay } },
  });

  const created = await prisma.$transaction(
    result.scheduleBlocks.map((b) =>
      prisma.scheduleBlock.create({
        data: {
          userId,
          taskId: b.taskId,
          date: startOfDay,
          startTime: new Date(b.startTime),
          endTime: new Date(b.endTime),
          generatedByAi: true,
        },
      })
    )
  );

  return NextResponse.json({
    scheduleBlocks: created,
    unscheduled: result.unscheduled,
    summary: result.summary,
  });
}
