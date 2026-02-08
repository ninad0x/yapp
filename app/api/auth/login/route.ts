import { prisma } from "@/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const teacher = await prisma.teacher.findUnique({ 
        where: { email } 
    });

    if (!teacher) return new Response("Invalid", { status: 401 });

    const ok = await bcrypt.compare(password, teacher.password);
    
    if (!ok) return new Response("Invalid", { status: 401 });

    const token = jwt.sign(
        { id: teacher.id },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
    );

  return Response.json({ token, teacher });
}