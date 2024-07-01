"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main className=" h-screen w-screen flex justify-center items-center">
      <Button variant={'outline'} onClick={() => router.push("/login")}>
        Login
      </Button>
    </main>
  );
}
