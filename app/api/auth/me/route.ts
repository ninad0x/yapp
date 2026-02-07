import { prisma } from "@/db"
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
    const auth = req.headers.get("authorization");

    if (!auth) {
        return new Response("Unauthorized", { status: 401 });
    }

    const token = auth.split(" ")[1];

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as { id: string };

        const teacher = await prisma.teacher.findUnique({
            where: { id: payload.id },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return Response.json(teacher);
    } catch {
        return new Response("Invalid token", { status: 401 });
    }
}