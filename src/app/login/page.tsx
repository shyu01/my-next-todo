// src/app/login/page.tsx ← 이걸로 완전히 교체해!!!

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
    async function login(formData: FormData) {
        "use server";

        const id = formData.get("id") as string;
        const pw = formData.get("pw") as string;

        if (id === "admin" && pw === "1234") {
            // 여기만 수정! await 넣기
            const cookieStore = await cookies();
            cookieStore.set("token", "fake-jwt-token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 7일
                path: "/",
            });

            redirect("/dashboard");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form action={login} className="p-8 bg-white rounded-xl shadow-lg space-y-4 w-96">
                <h1 className="text-3xl font-bold text-center">로그인</h1>
                <input
                    name="id"
                    placeholder="아이디"
                    defaultValue="admin"
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <input
                    name="pw"
                    type="password"
                    placeholder="비밀번호"
                    defaultValue="1234"
                    className="w-full px-4 py-2 border rounded-lg"
                    required
                />
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
                >
                    로그인
                </button>
            </form>
        </div>
    );
}