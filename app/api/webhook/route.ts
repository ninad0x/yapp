import { prisma } from "@/db"
import { langMap, messageReceivedMsg, welcomeMsg } from "@/lib/constants"
import { translate } from "@/lib/lingo"

export const runtime = "nodejs"

function twiml(message: string) {
  return new Response(
    `<Response><Message>${message}</Message></Response>`,
    { headers: { "Content-Type": "text/xml" } }
  )
}

export async function POST(req: Request) {
  const raw = await req.text()
  const params = new URLSearchParams(raw)

  const body = (params.get("Body") || "").trim()
  const phone = (params.get("From") || "").replace("whatsapp:", "")

  if (!body || body.toLowerCase().startsWith("join ")) {
    return new Response(null, { status: 204 })
  }

  let parent = await prisma.parent.findUnique({ where: { phone } })

  // STEP 1: New parent → ask language
  if (!parent) {
    console.log("🆕 Creating parent for:", phone)
    
    parent = await prisma.parent.create({
      data: {
        phone,
        language: null,
        teacherId: "e089eb01-3e4f-4f73-a6c1-fea092d8f1e9",
      },
    })
    
    console.log("✅ Parent created:", parent.id)
    console.log("📤 Sending language menu...")
    
    return twiml(
      "Welcome to St. Francis School\nChoose your language:\n1 - English\n2 - हिंदी\n3 - Русский\n4 - Español"
    )
  }

  // STEP 2: Language selection
if (parent.language === null) {
  console.log("lang select start");
  const input = body.match(/[1-4]/)?.[0]

  if (!input) {
    return twiml(
      `Welcome to St. Francis School ${parent.name}\nChoose your language:\n1 - English\n2 - हिंदी\n3 - Русский\n4 - Español`
    )
  }

  const lang = langMap[input]
  console.log("Updating to lang:", lang)

  try {
    parent = await prisma.parent.update({
      where: { phone },
      data: { language: lang },
    })
    console.log("lang db success")
  } catch (e) {
    console.error("lang db error:", e)
    throw e
  }

  return twiml(welcomeMsg[lang])
}

  // STEP 3: Parent message → translate to EN → store
  const translated =
    parent.language === "en"
      ? body
      : await translate({text: body, source: parent.language, target: "en"})

  await prisma.message.create({
    data: {
      parentId: parent.id,
      teacherId: parent.teacherId,
      direction: "IN",
      type: "TEXT",
      originalText: body,
      translatedText: translated,
    },
  })

  return twiml(messageReceivedMsg[parent.language])
}