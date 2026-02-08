import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { Parent } from "@/db/generated/prisma"

const ALLOWED_LANG = ["en", "hi", "ru", "es", ""]

export async function POST(req: Request) {

  const p = await req.json()

  if (!ALLOWED_LANG.includes(p.language)) {
    return NextResponse.json({ error: "Invalid language" }, { status: 400 })
  }

  const parent = await prisma.parent.create({
    data: {
      teacherId: p.teacherId,
      name: p.name,
      phone: p.phone,
      language: p.language,
      studentName: p.studentName,
    }
  })

  return NextResponse.json({ success: true, parent })
}