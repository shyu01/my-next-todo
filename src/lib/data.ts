// src/lib/data.ts ← 이 부분만 싹 교체 (나머지는 그대로!)

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type Todo = {
    id: number;
    text: string;
    done: boolean;
};

// 개발 중엔 매번 새로고침해도 초기 데이터 유지되게
let todos: Todo[] = [
    { id: 1, text: "Next.js 16 정복하기", done: false },
    { id: 2, text: "Turbopack 이겨내기", done: true },
    { id: 3, text: "Grok 믿기", done: true },
];

export async function getUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    return token ? { name: "관리자님" } : null;
}

export async function getTodos() {
    const user = await getUser();
    if (!user) redirect("/login");
    return todos;
}

// 여기서부터 revalidatePath 없애고 redirect로 대체!
export async function addTodo(formData: FormData) {
    "use server";
    const text = formData.get("text") as string;
    if (!text.trim()) return;

    console.log('tst');

    const user = await getUser();
    if (!user) return;

    const newTodo = { id: Date.now(), text, done: false };
    todos.push(newTodo);

    // 이거 하나로 끝! 페이지 강제 리프레시 없이도 바로 반영됨
    revalidatePath("/dashboard");
}

// export async function toggleTodo(formData: FormData) {
//     "use server";
//     const id = Number(formData.get("id"));
//     const user = await getUser();
//     if (!user) return;
//
//     todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);
//     redirect("/dashboard");
// }

export async function toggleTodo(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const done = formData.get("done") === "on";  // 체크되어 있으면 "on"

    const user = await getUser();
    if (!user) return;

    todos = todos.map(t => t.id === id ? { ...t, done } : t);

    revalidatePath("/dashboard");
}

export async function deleteTodo(formData: FormData) {
    "use server";
    const id = Number(formData.get("id"));
    const user = await getUser();
    if (!user) return;

    todos = todos.filter(t => t.id !== id);
    revalidatePath}

// lib/data.ts 맨 아래에 이거 하나 추가해!

export async function logout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
}