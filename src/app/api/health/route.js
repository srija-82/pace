import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.user.count();

    return Response.json({
      success: true,
      message: "Database connected",
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}