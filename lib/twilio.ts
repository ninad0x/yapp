import twilio from "twilio"

export const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
)

export async function sendWhatsApp(
  to: string,
  text: string,
  pdfUrl?: string
) {
  await client.messages.create({
    from: "whatsapp:+14155238886",
    to: `whatsapp:${to}`,
    body: text,
    ...(pdfUrl && { mediaUrl: [pdfUrl] })
  })
}