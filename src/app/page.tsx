"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Question } from "../models/Question";
import { Bird } from "../models/Bird";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [birds, setBirds] = useState<Bird[]>([]);
  const [askedQuestions, setAskedQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    async function loadData() {
      const questionsRes = await fetch("/birds/rsa/data/questions.json");
      const birdsRes = await fetch("/birds/rsa/data/birds.json");
      const questionsData = await questionsRes.json();
      const birdsData = await birdsRes.json();
      setQuestions(questionsData.data || []);
      setBirds(birdsData.data || []);
    }
    loadData();
  }, []);

  function askRandomQuestion() {
    if (questions.length === 0) {
      setCurrentQuestion(null);
      return;
    }
    const idx = Math.floor(Math.random() * questions.length);
    const picked = questions[idx];
    setCurrentQuestion(picked);
    setQuestions(prev => prev.filter((_, i) => i !== idx));
    setAskedQuestions(prev => [...prev, picked]);
  }

  function restartQuiz() {
    console.log("Restarting quiz");
    setQuestions([...questions, ...askedQuestions]);
    setAskedQuestions([]);
    setCurrentQuestion(null);
  }

  const showBegin = currentQuestion === null && questions.length > 0;
  const allDone = questions.length === 0 && currentQuestion === null;

  let buttonText = "Next";
  let buttonColor = "bg-blue-600 hover:bg-blue-700";
  let buttonAction = askRandomQuestion;

  if (showBegin) {
    buttonText = "Begin";
    buttonColor = "bg-blue-600 hover:bg-blue-700";
    buttonAction = askRandomQuestion;
  } else if (allDone) {
    buttonText = "All done! Restart";
    buttonColor = "bg-red-600 hover:bg-red-700";
    buttonAction = restartQuiz;
  }

  return (
    <div className="font-sans flex flex-col min-h-screen p-8 pb-20 sm:p-20">
      <header className="w-full flex justify-center items-center mb-4">
        <Image
          className="dark:invert"
          src="/bird_id.svg"
          alt="Bird Id"
          width={180}
          height={180}
          priority
        />
      </header>
      <main className="flex flex-col gap-8 items-center">
        {showBegin && (
          <div className="text-xl font-semibold mb-2">
            {questions.length} birds to identify!
          </div>
        )}
        {currentQuestion && <QuestionDisplay question={currentQuestion} birds={birds} />}
        <button
          className={`px-4 py-2 text-white rounded ${buttonColor}`}
          onClick={buttonAction}
        >
          {buttonText}
        </button>
      </main>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}

interface QuestionDisplayProps {
  question: Question;
  birds: Bird[];
}

export function QuestionDisplay({ question, birds }: QuestionDisplayProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Bird[]>([]);
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);

  // Clear input and result when question changes
  useEffect(() => {
    setInput("");
    setSuggestions([]);
    setResult(null);
  }, [question]);

  // Filter birds as user types
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setInput(value);
    if (value.length === 0) {
      setSuggestions([]);
    } else {
      setSuggestions(
        birds.filter(bird =>
          bird.fullName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    setResult(null); // Reset result when typing
  }

  function handleSelect(bird: Bird) {
    setInput(bird.fullName);
    setSuggestions([]);
    // Compare sabap2 to question.answer
    if (String(bird.sabap2) === String(question.answer)) {
      setResult("correct");
    } else {
      setResult("incorrect");
    }
  }

  return (
    <div className="mb-4 flex flex-col items-center">
      <Image
        src={question.image}
        alt={`Question`}
        width={400}
        height={300}
        style={{ height: "auto", width: "100%", maxWidth: "400px" }}
      />
      <div className="mt-4 w-full relative" style={{ maxWidth: 400 }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type bird name..."
          className="w-full px-3 py-2 border rounded"
        />
        {suggestions.length > 0 && (
          <ul className="w-full absolute left-0 bg-white border rounded shadow z-10 mt-1 max-h-40 overflow-y-auto">
            {suggestions.map(bird => (
              <li
                key={bird.fullName}
                className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSelect(bird)}
              >
                {bird.fullName}
              </li>
            ))}
          </ul>
        )}
        {result === "correct" && (
          <div className="flex items-center mt-2 text-green-600 font-semibold">
            <span className="mr-2">✔️</span> Correct
          </div>
        )}
        {result === "incorrect" && (
          <div className="flex items-center mt-2 text-red-600 font-semibold">
            <span className="mr-2">❌</span> Incorrect
          </div>
        )}
      </div>
    </div>
  );
}