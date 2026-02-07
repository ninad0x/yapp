
let lastMsg = "";

export async function POST(req: Request) {
  const form = await req.formData();
  lastMsg = form.get("Body") as string;
  console.log(lastMsg);
//   return new Response("ok");
}

export async function GET() {
  return Response.json({ lastMsg });
}