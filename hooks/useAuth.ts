// hooks/useAuth.ts
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Teacher } from "@/db/generated/prisma"

export function useAuth() {
    
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.replace("/login")
      return
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(setTeacher)
      .catch(() => {
        localStorage.removeItem("token")
        router.replace("/login")
      })
      .finally(() => setLoading(false))
  }, [router])

  return { teacher, loading }
}