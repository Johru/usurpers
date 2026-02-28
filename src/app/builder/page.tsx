'use client';
import {useCallback, useEffect, useState } from "react";
import SetSelection from "./SetSelection";
import SelectedCards from "./SelectedCards";
import StatsSidebar from "./StatsSidebar";
import { Card} from "@/lib/categories";

type SavedSelection = { id: number; name: string; slots: Card[]; };


export default function BuilderPage() {

const [selectedCard, setSelectedCard] = useState<Card | null>(null);
const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [slots, setSlots] = useState<(Card | null)[]>(() => {
    if (typeof window === 'undefined') return Array(7).fill(null);
    const raw = localStorage.getItem('pendingEdit');
    if (!raw) return Array(7).fill(null);
    const entry = JSON.parse(raw) as SavedSelection;
    return [...entry.slots, ...Array(7 - entry.slots.length).fill(null)];
  });

  const [selectionName, setSelectionName] = useState(() => {
    if (typeof window === 'undefined') return '';
    const raw = localStorage.getItem('pendingEdit');
    return raw ? (JSON.parse(raw) as SavedSelection).name : '';
  });

  const [editingId, setEditingId] = useState<number | null>(() => {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem('pendingEdit');
    if (raw) {
      localStorage.removeItem('pendingEdit');
      return (JSON.parse(raw) as SavedSelection).id;
    }
    return null;
  });

  const toggleActive = (index: number) => {
  setActiveIndex(prev => prev === index ? null : index);
};


const addCard = (card: Card) => {
  setSlots(prev => {
    const isDuplicate = prev.some(s => s?.id === card.id);
    if (isDuplicate) return prev;

    const next = [...prev];
    const emptyIndex = next.findIndex(s => s === null);
    if (emptyIndex !== -1) {
      next[emptyIndex] = card;
      toggleActive(emptyIndex)
      setSelectedCard(card);
    }
    return next;
  });
}

const clearSlots = () => {
  setSlots(Array(7).fill(null));
}



const saveSelection = useCallback(() => {
  if (!selectionName.trim()) return;
  const existing: SavedSelection[] = JSON.parse(localStorage.getItem('savedSelections') ?? '[]');
  const newEntry = {
    id: editingId ?? Date.now(),
    name: selectionName,
    slots: slots.filter((s): s is Card => s !== null),
  };
  const index = existing.findIndex(e => e.id === newEntry.id);
  const updated = index !== -1 ? existing.with(index, newEntry) : [...existing, newEntry];
  localStorage.setItem('savedSelections', JSON.stringify(updated));
  setEditingId(newEntry.id);
}, [slots, selectionName, editingId]);


useEffect(() => {
  if (!editingId || !selectionName.trim()) return;
  const timeout = setTimeout(() => saveSelection(), 500);
  return () => clearTimeout(timeout);
}, [slots, selectionName, editingId, saveSelection]);

  return (
     <div className="flex min-h-screen items-center ">
      <main className="flex min-h-screen w-full h-full flex-col items-center sm:items-start">
       
        <SelectedCards slots={slots} setSlots={setSlots} activeIndex={activeIndex} setActiveIndex={setActiveIndex} clearSlots={clearSlots}  
           selectionName={selectionName} toggleActive={toggleActive} setSelectionName={setSelectionName} setSelectedCard={setSelectedCard} editingId={editingId} setEditingId={setEditingId} />

        <div className="flex w-full gap-1 flex-col md:flex-row">          
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