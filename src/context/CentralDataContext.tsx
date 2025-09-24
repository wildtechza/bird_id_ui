"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CentralDataContext = createContext<any>(null);

export function CentralDataProvider({ children }: { children: React.ReactNode }) {
    const [questions, setQuestions] = useState<any>(null);
    const [birds, setBirds] = useState<any>(null);

    const fetchData = async () => {
        const questionsRes = await fetch("/birds/rsa/data/questions.json");
        const birdsRes = await fetch("/birds/rsa/data/birds.json");
        const questionsData = await questionsRes.json();
        const birdsData = await birdsRes.json();
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

export function useCentralData() {
    return useContext(CentralDataContext);
}