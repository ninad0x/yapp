import { prisma } from "@/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const hash = await bcrypt.hash(password, 10);

    const teacher = await prisma.teacher.create({
      data: { name, email, password: hash },
    });

    return Response.json({ id: teacher.id });
}