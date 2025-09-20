"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [questions, setQuestions] = useState([]);
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    async function loadData() {
      const questionsRes = await fetch("/birds/rsa/data/questions.json");
      const birdsRes = await fetch("/birds/rsa/data/birds.json");
      const questionsData = await questionsRes.json();
      const birdsData = await birdsRes.json();
      setQuestions(questionsData.questions || []);

      console.log("Loaded birds data:", birdsData);
      setBirds(birdsData.birds || []);
    }
    loadData();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
       <header className="row-start-1 w-full flex justify-center items-center mb-4">
        {/* <h1 className="text-3xl font-bold text-center">Bird ID UI</h1> */}
        <Image
          className="dark:invert"
          src="/bird_id.svg"
          alt="Bird Id"
          width={180}
          height={180}
          priority
        />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
         {/* Example: Render questions and birds */}
        <div>
          <h2>Questions</h2>
          <ul>
            {questions.map((q: any, idx: number) => (
              <li key={idx} className="mb-4 flex flex-col items-center">
                <Image
                  src={q.image}
                  alt={`Question ${idx + 1}`}
                  width={400} // You can adjust width as needed
                  height={300} // You can adjust height as needed
                  style={{ height: "auto", width: "100%", maxWidth: "400px" }}
                  priority={idx === 0}
                />
                <span className="mt-2 text-lg">(Answer: {q.answer})</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Birds</h2>
          <ul>
            {birds.map((b: any, idx: number) => (
              <li key={idx}>{b.fullName}</li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
