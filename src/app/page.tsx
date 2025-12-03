// // src/app/page.tsx
// import Image from "next/image";
// import { getUser } from "@/lib/data";
// import { redirect } from "next/navigation";
//
// export default async function Home() {
//   const user = await getUser();
//
//   // 로그인 상태면 바로 대시보드로
//   if (user) {
//     redirect("/dashboard");
//   }
//
//   // 로그인 안 된 상태면 여기만 렌더링 (return 하나만!)
//   return (
//       <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//         <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//           <Image
//               className="dark:invert"
//               src="/next.svg"
//               alt="Next.js logo"
//               width={180}
//               height={38}
//               priority
//           />
//
//           <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//             <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//               To get started, edit the page.tsx file.
//             </h1>
//             <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//               Looking for a starting point or more instructions? Head over to{" "}
//               <a href="https://vercel.com/templates" className="font-medium underline">
//                 Templates
//               </a>{" "}
//               or the{" "}
//               <a href="https://nextjs.org/learn" className="font-medium underline">
//                 Learning
//               </a>{" "}
//               center.
//             </p>
//           </div>
//
//           <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//             <a
//                 href="https://vercel.com/new"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex h-12 items-center justify-center gap-2 rounded-full bg-black px-5 text-white dark:bg-white dark:text-black"
//             >
//               Deploy Now
//             </a>
//             <a
//                 href="https://nextjs.org/docs"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex h-12 items-center justify-center rounded-full border border-black/[.08] px-5 dark:border-white/[.145]"
//             >
//               Documentation
//             </a>
//           </div>
//         </main>
//       </div>
//   );
// }

// src/app/page.tsx  ← 이거로 완전히 갈아치워!!!
import Image from "next/image";
import { getUser } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              To get started, edit the page.tsx file.
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Looking for a starting point or more instructions? Head over to{" "}
              <a href="https://vercel.com/templates" className="font-medium underline">
                Templates
              </a>{" "}
              or the{" "}
              <a href="https://nextjs.org/learn" className="font-medium underline">
                Learning
              </a>{" "}
              center.
            </p>
          </div>
        </main>
      </div>
  );
}