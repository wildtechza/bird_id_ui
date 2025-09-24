"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCentralData } from "../../context/CentralDataContext";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { Question } from "../../models/Question";
import { Bird } from "../../models/Bird";

export default function Home() {
    const { questions, birds } = useCentralData();
    const [questionsUnused, setQuestionsUnused] = useState<Question[]>(questions || []);
    const [askedQuestions, setAskedQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    console.log(`QUESTIONS: ${questions?.length} BIRDS: ${birds?.length} QUESTIONS_UNUSED: ${questionsUnused.length} ASKED: ${askedQuestions.length} CURRENT: ${currentQuestion ? 1 : 0}`);

    useEffect(() => {
        if (questions) {
            setQuestionsUnused(questions);
        }
    }, [questions]);

    const correctBird =
        currentQuestion && birds.find(
            bird => String(bird.sabap2) === String(currentQuestion.answer)
        );

    useEffect(() => {
        setShowAnswer(false);
    }, [currentQuestion]);

    function askRandomQuestion() {
        if (questionsUnused.length === 0) {
            setCurrentQuestion(null);
            return;
        }
        const idx = Math.floor(Math.random() * questionsUnused.length);
        const picked = questionsUnused[idx];
        setCurrentQuestion(picked);
        setQuestionsUnused(prev => prev.filter((_, i) => i !== idx));
        setAskedQuestions(prev => [...prev, picked]);
    }

    function restartQuiz() {
        console.log("Restarting quiz");
        setQuestionsUnused([...questionsUnused, ...askedQuestions]);
        setAskedQuestions([]);
        setCurrentQuestion(null);
    }

    const showBegin = currentQuestion === null && questionsUnused.length > 0;
    const allDone = questionsUnused.length === 0 && currentQuestion === null;

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
            <main className="flex flex-col gap-8 items-center">
                {showBegin && (
                    <div className="flex flex-col items-center text-xl font-semibold mb-2">
                        <Image
                            className="mb-4"
                            src="/binoculars.svg"
                            alt="Bird Id"
                            width={400}
                            height={180}
                            priority
                        />
                        <span>{questions.length} birds to identify!</span>
                    </div>
                )}
                {currentQuestion && <QuestionDisplay question={currentQuestion} birds={birds} />}
                {showAnswer && (
                    <div className="mt-2 text-lg font-semibold text-blue-700">
                        Answer: {correctBird?.fullName || currentQuestion?.answer}
                    </div>
                )}
                <div className="flex gap-4">
                    {currentQuestion && (
                        <button
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            onClick={() => setShowAnswer(true)}
                        >
                            View Answer
                        </button>
                    )}
                    <button
                        className={`px-4 py-2 text-white rounded ${buttonColor}`}
                        onClick={buttonAction}
                    >
                        {buttonText}
                    </button>
                </div>
            </main>
            <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}