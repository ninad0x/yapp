"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type User = {
    id: string;
    name: string;
    email: string;
};

export default function Me() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
            return;
        }

        fetch("/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            if (!res.ok) {
                localStorage.removeItem("token");
                router.push("/login");
            } else {
                res.json().then(setUser);
            }
        });
    }, []);

    function logout() {
        localStorage.removeItem("token");
        router.push("/login");
    }

    if (!user) return <div className="mt-20 text-center">Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-20 space-y-4">
            <h2 className="text-xl font-semibold">Profile</h2>

            <div>
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
            </div>

            <Button variant="destructive" onClick={logout}>
                Logout
            </Button>
        </div>
    );
}