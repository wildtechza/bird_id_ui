"use client";

import Link from "next/link";
import { useCentralData } from "../context/CentralDataContext";

export default function Home() {
  const { questions, birds } = useCentralData();

  const options = [
    { difficulty: "beginner", label: "Multiple Choice, how many questions", counts: [10, 20, 50] },
    { difficulty: "advanced", label: "Type the answer, how many questions", counts: [10, 20, 50] },
  ];

  return (
    <div className="flex flex-col items-center p-6 space-y-8">
      <h1 className="text-2xl font-bold">Choose Your Quiz</h1>
      {options.map((opt) => (
        <div key={opt.difficulty} className="w-full max-w-sm">
          <h2 className="text-lg font-semibold capitalize">{opt.difficulty}</h2>
          <p className="text-gray-600 text-sm mb-3">{opt.label}</p>
          <div className="flex gap-3">
            {opt.counts.map((count) => (
              <Link
                key={count}
                href={{
                  pathname: "/quiz",
                  query: { difficulty: opt.difficulty, count },
                }}
                className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                {count}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
