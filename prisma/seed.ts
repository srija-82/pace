import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const guest = await prisma.user.upsert({
    where: { email: "guest@pace.app" },
    update: {},
    create: {
      email: "guest@pace.app",
      name: "Guest User",
      isGuest: true,
    },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.task.createMany({
    data: [
      {
        userId: guest.id,
        title: "Finish PACE pitch deck",
        category: "WORK",
        priority: "HIGH",
        difficulty: "HARD",
        importance: "HIGH",
        estimatedDuration: 90,
        dueDate: new Date(today.getTime() + 13 * 60 * 60 * 1000),
      },
      {
        userId: guest.id,
        title: "Submit hackathon build",
        category: "DEADLINE",
        priority: "URGENT",
        difficulty: "MEDIUM",
        importance: "HIGH",
        estimatedDuration: 60,
        dueDate: new Date(today.getTime() + 14 * 60 * 60 * 1000),
      },
      {
        userId: guest.id,
        title: "Book vet appointment",
        category: "PERSONAL",
        priority: "MEDIUM",
        difficulty: "EASY",
        importance: "LOW",
        estimatedDuration: 15,
        dueDate: new Date(today.getTime() + 48 * 60 * 60 * 1000),
      },
    ],
  });

  await prisma.calendarEvent.createMany({
    data: [
      {
        userId: guest.id,
        title: "Team standup",
        startTime: new Date(today.getTime() + 9 * 60 * 60 * 1000),
        endTime: new Date(today.getTime() + 9.5 * 60 * 60 * 1000),
      },
      {
        userId: guest.id,
        title: "Lunch",
        startTime: new Date(today.getTime() + 12 * 60 * 60 * 1000),
        endTime: new Date(today.getTime() + 13 * 60 * 60 * 1000),
      },
    ],
  });

  console.log("Seed complete. Guest user:", guest.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
