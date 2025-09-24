"use client";

import { useCentralData } from "../context/CentralDataContext";

export default function Home() {
  const { questions, birds } = useCentralData();
  
  console.log("HOME!");
  
  return (
    <div>
      {<h1>HOME! {birds?.length}</h1>}
    </div>
  );
}