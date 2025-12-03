// src/app/dashboard/page.tsx
import { getTodos, addTodo, toggleTodo, deleteTodo, getUser, logout } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const user = await getUser();
    if (!user) redirect("/login");

    const todos = await getTodos();

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">
                {user.name}님의 투두 리스트
            </h1>

            {/* 투두 추가 폼 */}
            <form action={addTodo} className="flex gap-2 mb-12">
                <input
                    name="text"
                    placeholder="할 일 입력하고 엔터~"
                    className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 text-lg"
                    required
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition">
                    추가
                </button>
            </form>

            {/* 투두 리스트 */}
            <div className="space-y-4">
                {todos.length === 0 ? (
                    <p className="text-center text-gray-500 text-xl py-12">
                        아직 할 일이 없어요! 위에서 추가해보세요
                    </p>
                ) : (
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className={`p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${
                                todo.done ? "bg-green-50 border-green-400" : "bg-white border-gray-300"
                            }`}
                        >
                            {/* 토글 폼 */}
                            {/* 이거 통째로 복붙해!!! */}
                            <form action={toggleTodo} className="flex items-center gap-4 flex-1">
                                <input type="hidden" name="id" value={todo.id} />

                                <label className="flex items-center gap-4 cursor-pointer flex-1 select-none">
                                    <input
                                        type="checkbox"
                                        name="done"
                                        defaultChecked={todo.done}
                                        className="w-7 h-7 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className={`text-xl ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}>
      {todo.text}
    </span>
                                </label>
                            </form>

                            {/* 삭제 폼 */}
                            <form action={deleteTodo}>
                                <input type="hidden" name="id" value={todo.id} />
                                <button type="submit" className="text-3xl text-red-500 hover:text-red-700">
                                    X
                                </button>
                            </form>
                        </div>
                    ))
                )}
            </div>

            {/* 로그아웃 버튼 (보너스) */}
            {/* 로그아웃 버튼 */}
            <div className="mt-12 text-center">
                <form action={logout}>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition">
                        로그아웃
                    </button>
                </form>
            </div>
        </div>
    );
}