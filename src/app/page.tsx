"use client";
import React, { useEffect, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useRouter } from "next/navigation";
import TypingAnimation from "@/components/ui/typing-animation";

const headline =
  "Our startup revolutionizes music creation with AI, empowering artists to effortlessly compose and produce professional-quality music, exploring new creative horizons with advanced algorithms.";

export default function SparklesPreview() {

  const router = useRouter();

  // re-render component using state
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-screen w-full bg-black flex flex-row max-lg:flex-col-reverse items-center justify-around max-lg:justify-center max-lg:gap-4 overflow-hidden rounded-md">
      <div className=" max-w-[32vw] max-lg:max-w-[80vw] flex flex-col justify-center items-center gap-6 p-8 rounded-[2rem] shadow-2xl lg:shadow-[#050502]">
        <span className=" text-wrap justify-normal text-white">
          <TextGenerateEffect key={key} words={headline} className=" max-lg:text-sm justify-normal" />
        </span>
        <Button
          className=" p-4 font-semibold text-lg rounded-sm bg-black shadow-2xl lg:hover:bg-white duration-150 ease-in lg:hover:text-black lg:hover:duration-150 lg:hover:ease-out lg:hover:shadow-white max-lg:bg-white max-lg:text-black"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </div>

      <div className=" flex flex-col justify-center items-center overflow-hidden gap-0">
        {/* <h1 className="text-8xl max-lg:text-6xl font-bold text-center text-white relative z-20">
          TuneBot
        </h1> */}
        <TypingAnimation
          key={key}
          className="text-8xl max-lg:text-6xl font-bold text-white dark:text-white z-20"
          text="TuneBot"
        />
        <div className="relative w-64 h-20 sm:w-96 sm:h-24 md:w-[30rem] md:h-28 lg:w-[35rem] lg:h-32 xl:w-[40rem] xl:h-40 mt-2">
          {/* Gradients */}
          <div className="absolute inset-x-5 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-5 sm:inset-x-10 md:inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-20 sm:inset-x-30 md:inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-20 sm:inset-x-30 md:inset-x-40 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(200px_100px_at_top,transparent_20%,white)] md:[mask-image:radial-gradient(250px_150px_at_top,transparent_20%,white)] lg:[mask-image:radial-gradient(300px_175px_at_top,transparent_20%,white)] xl:[mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </main>
  );
}
