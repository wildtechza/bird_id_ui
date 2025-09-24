"use client";

import { useRouter } from "next/navigation";
import { useCentralData } from "../../context/CentralDataContext";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { QuestionDisplay } from "../../components/QuestionDisplay";
import { Question } from "../../models/Question";
import { Bird } from "../../models/Bird";

export default function Quiz() {
    const router = useRouter();
    const { questions, birds } = useCentralData();
    const searchParams = useSearchParams();
    const difficulty = searchParams.get('difficulty');
    const count = parseInt(searchParams.get('count'));

    const [questionsToAsk, setQuestionsToAsk] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        if (questions) {
            let temp = [];
            while (temp.length < count) {
                const idx = Math.floor(Math.random() * questions.length);
                const picked = questions[idx];
                if (!temp.find(q => q.answer === picked.answer)) {
                    temp.push(picked);
                }
            }

            setQuestionsToAsk(temp);
        }
    }, [questions]);

    useEffect(() => {
        if (questionsToAsk.length > 0 && currentQuestion === null) {
            askRandomQuestion();
        }
    }, [questionsToAsk]);

    const correctBird =
        currentQuestion && birds.find(
            (bird: Bird) => String(bird.sabap2) === String(currentQuestion.answer)
        );

    useEffect(() => {
        setShowAnswer(false);
    }, [currentQuestion]);

    function askRandomQuestion() {
        if (questionsToAsk.length === 0) {
            router.push("/complete");
            return;
        }
        const idx = Math.floor(Math.random() * questionsToAsk.length);
        const picked = questionsToAsk[idx];
        setCurrentQuestion(picked);
        setQuestionsToAsk(prev => prev.filter((_, i) => i !== idx));
    }

    return (
        <div className="font-sans flex flex-col min-h-screen p-8 pb-20 sm:p-20">
            {currentQuestion &&
                <main className="flex flex-col gap-8 items-center">
                    <h1 className="text-2xl font-bold">{questionsToAsk.length + 1} Questions to go!</h1>
                    <QuestionDisplay question={currentQuestion} birds={birds} />
                    {showAnswer && (
                        <div className="mt-2 text-lg font-semibold text-blue-700">
                            Answer: {correctBird?.fullName || currentQuestion?.answer}
                        </div>
                    )}
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                            onClick={() => setShowAnswer(true)}
                        >
                            View Answer
                        </button>

                        <button
                            className={`px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700`}
                            onClick={askRandomQuestion}
                        >
                            Next
                        </button>
                    </div>
                </main>
            }
            <footer className="flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}