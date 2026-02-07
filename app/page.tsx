"use client"

import { useEffect, useState } from "react";

export default function Home() {

  const [msg, setMsg] = useState("");
  useEffect(() => {
    fetch("/api/webhook").then(r=>r.json()).then(d=>setMsg(d.lastMsg));
  }, [])


  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {msg}
    </div>
  );
}
