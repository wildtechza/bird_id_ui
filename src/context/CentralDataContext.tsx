"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Question } from "../models/Question";
import { Bird } from "../models/Bird";

// Define the shape of the context
interface CentralDataContextType {
    questions: Question[] | null;
    birds: Bird[] | null;
}

const CentralDataContext = createContext<CentralDataContextType | undefined>(undefined);

export function CentralDataProvider({ children }: { children: React.ReactNode }) {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [birds, setBirds] = useState<Bird[] | null>(null);

    const fetchData = async () => {
        const questionsRes = await fetch("/birds/rsa/data/questions.json");
        const birdsRes = await fetch("/birds/rsa/data/birds.json");

        const questionsData: { data: Question[] } = await questionsRes.json();
        const birdsData: { data: Bird[] } = await birdsRes.json();

        setQuestions(questionsData.data || []);
        setBirds(birdsData.data || []);

        console.log(`Fetched questions and birds data ${questionsData.data.length} ${birdsData.data.length}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CentralDataContext.Provider value={{ questions, birds }}>
            {children}
        </CentralDataContext.Provider>
    );
}

export function useCentralData(): CentralDataContextType {
  const context = useContext(CentralDataContext);
  if (!context) {
    throw new Error("useCentralData must be used within a CentralDataProvider");
  }
  return context;
}