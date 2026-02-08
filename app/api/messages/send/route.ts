import { NextResponse } from "next/server"
import { prisma } from "@/db"
import { sendWhatsApp } from "@/lib/twilio"
import { translate } from "@/lib/lingo"
import { pdfToText } from "@/lib/pdfToText"
import { uploadPDF } from "@/lib/uploadPdf"

export const runtime = "nodejs"

export async function POST(req: Request) {
  const form = await req.formData()

  const teacherId = form.get("teacherId") as string
  const text = form.get("text") as string
  const parentId = form.get("parentId") as string | null
  const pdf = form.get("pdf") as File | null

  let baseText = text
  let pdfUrl = ""
  if (pdf) {
    [baseText, pdfUrl] = await Promise.all([
      pdfToText(pdf),
      uploadPDF(pdf)
    ])
  }

  console.log(baseText);

  // 2. Target parents (single or bulk)
  const parents = parentId
    ? [await prisma.parent.findUnique({ where: { id: parentId } })]
    : await prisma.parent.findMany({ where: { teacherId } })

  // 3. Translate + send
  for (const p of parents) {
    if (!p) continue
    if (p.phone === "+14155238886") continue

    // console.log(p.language);

    const translated =
      p.language === "en"
        ? baseText
        : await translate({
            text: baseText,
            source: "en",
            target: p.language ?? "en"
          })

    console.log("translated", translated);
     
    await prisma.message.create({
      data: {
        teacherId,
        parentId: p.id,
        direction: "OUT",
        type: pdf ? "PDF" : "TEXT",
        originalText: baseText,
        translatedText: translated
      }
    })

    await sendWhatsApp(p.phone, translated, pdfUrl)
  }

  return NextResponse.json({ success: true })
}