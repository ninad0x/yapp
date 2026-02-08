import { LingoDotDevEngine } from "lingo.dev/sdk"

export const lingo = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
})

type translationData = {
  text: string,
  target: string,
  source: string
}

export async function translate({ text, source, target}: translationData) {
  return await lingo.localizeText(text, {
    sourceLocale: source,
    targetLocale: target
  })
}

