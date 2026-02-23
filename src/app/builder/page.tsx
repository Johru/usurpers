'use client';
import {useState } from "react";
import SetSelection from "./SetSelection";
import SelectedCards from "./SelectedCards";
import StatsSidebar from "./StatsSidebar";
import { Card} from "@/lib/categories";



export default function BuilderPage() {


const [slots, setSlots] = useState<(Card| null)[]>(Array(7).fill(null));
const [selectionName, setSelectionName] = useState('');
const [selectedCard, setSelectedCard] = useState<Card | null>(null);

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

const clearSlots = () => {
  setSlots(Array(7).fill(null));
}

const saveSelection = () => {
  const existing = JSON.parse(localStorage.getItem('savedSelections') ?? '[]');
  const newEntry = {
    id: Date.now(),
    name: selectionName || `Selection ${existing.length + 1}`,
    slots: slots.filter((s): s is Card => s !== null),
  };
  localStorage.setItem('savedSelections', JSON.stringify([...existing, newEntry]));
  setSelectionName('');
  };


  return (
     <div className="flex min-h-screen items-center ">
      <main className="flex min-h-screen w-full h-full flex-col items-center sm:items-start">
       
        <SelectedCards slots={slots} setSlots={setSlots} clearSlots={clearSlots} saveSelection={saveSelection} 
           selectionName={selectionName} setSelectionName={setSelectionName} setSelectedCard={setSelectedCard} />

        <div className="flex w-full gap-1 ">          
          <div className="flex-3"  >
           <SetSelection onSelectCard={addCard}  />
          </div>         
          <div className="flex-2">
            <StatsSidebar slots={slots} selectedCard={selectedCard}/>
          </div>      
        </div>
        

      </main>
    </div>
  )
}