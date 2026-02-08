import { extractText } from 'unpdf'

export async function pdfToText(file: File) {
  console.log("pdf extraction started")
  const buffer = await file.arrayBuffer()
  const { text } = await extractText(buffer)
  console.log("pdf extraction success")
  return text.join('\n')
}