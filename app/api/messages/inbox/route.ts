import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const teacherId = searchParams.get("teacherId")!

  const messages = await prisma.message.findMany({
    where: {
      teacherId,
      direction: "IN",
    },
    include: {
      parent: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(messages)
}