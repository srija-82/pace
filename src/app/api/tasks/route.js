import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-user";

async function ensureDemoUser() {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "demo@pace.ai",
    },
  });

  if (existingUser) return existingUser;

  return prisma.user.create({
    data: {
      id: DEMO_USER_ID,
      email: "demo@pace.ai",
      name: "Demo User",
      isGuest: true,
    },
  });
}

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(tasks);
}

export async function POST(req) {
  const body = await req.json();

  await ensureDemoUser();

  const task = await prisma.task.create({
    data: {
      userId: DEMO_USER_ID,
      title: body.title,
      description: body.description || "",
    },
  });

  return Response.json(task);
}
