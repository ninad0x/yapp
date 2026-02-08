// hooks/useInbox.ts
import { Parent, Message } from "@/db/generated/prisma"
import { useState, useEffect } from "react"

type MessageWithParent = Message & { parent: Parent | null }

export function useInbox(teacherId?: string) {
  const [messages, setMessages] = useState<MessageWithParent[]>([])

  useEffect(() => {
    if (!teacherId) return

    const fetchInbox = async () => {
      const res = await fetch(`/api/messages/inbox?teacherId=${teacherId}`)
      if (res.ok) setMessages(await res.json())
    }

    fetchInbox()
    const interval = setInterval(fetchInbox, 3000)
    return () => clearInterval(interval)
  }, [teacherId])

  return { messages }
}