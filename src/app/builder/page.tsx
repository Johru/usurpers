'use client';
import {useState } from "react";
import SetSelection from "./SetSelection";
import SelectedCards from "./SelectedCards";
import StatsSidebar from "./StatsSidebar";
import { Card} from "@/lib/categories";



export default function BuilderPage() {


const [slots, setSlots] = useState<(Card| null)[]>(Array(7).fill(null));

const addCard = (card: Card) => {
  setSlots(prev => {
    const isDuplicate = prev.some(s => s?.id === card.id);
    if (isDuplicate) return prev;

    const next = [...prev];
    const emptyIndex = next.findIndex(s => s === null);
    if (emptyIndex !== -1) next[emptyIndex] = card;
    return next;
  });
}


  return (
     <div className="flex min-h-screen items-center ">
      <main className="flex min-h-screen w-full h-full flex-col items-center sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight">
          Selected Cards
        </h1>
       
        <SelectedCards slots={slots} setSlots={setSlots}/>

        <div className="flex w-full gap-1">
          <div className="flex-2" >
           <SetSelection onSelectCard={addCard} />
          </div>
      
           <div className="flex-3">
          <StatsSidebar slots={slots} />
          </div>
        </div>
      </main>
    </div>
  )
}