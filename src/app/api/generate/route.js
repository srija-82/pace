import { prisma } from "@/lib/prisma";
import { model } from "@/lib/gemini";

export async function POST() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const taskList = tasks
    .map((task) => `- ${task.title}`)
    .join("\n");

  const prompt = `
You are an AI productivity planner.

Create a smart schedule for these tasks:

${taskList}

Give concise scheduling advice.
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  return Response.json({
    schedule: text,
  });
}