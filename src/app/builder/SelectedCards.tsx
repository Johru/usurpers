
import { Card } from '@/lib/categories';
import Image from 'next/image';
import { useRef, useState } from 'react';
type Props = {
  slots: (Card | null)[];
  setSlots: React.Dispatch<React.SetStateAction<(Card | null)[]>>;
};

export default function SelectedCards({ slots=[], setSlots }: Props) {

const dragIndex = useRef<number | null>(null);

const handleDragStart = (index: number | null): void => {
  dragIndex.current = index;
};

const handleDrop = (dropIndex: number): void => {
  if (dragIndex.current === null) return;
  const fromIndex = dragIndex.current;

  setSlots(prev => {
    const next = [...prev];
    [next[fromIndex], next[dropIndex]] = [next[dropIndex], next[fromIndex]];
    return next;
  });

  dragIndex.current = null;
};

const removeCard = (index: number) => {
  setSlots(prev => {
    const next = [...prev];
    next[index] = null;
    return next;
  });
};
  return (

    <div className="bg-(--panelbg) w-full rounded-2xl py-5">
      <div className='flex justify-between'>
        {slots.map((card, index) => (
        <div
          key={index}
          id={`selectedCard${index + 1}`}
          className="w-[13.5%] h-auto px-3"
          draggable={card !== null}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        >
        {card ? (
          <div className="relative group">
            <button
              onClick={() => removeCard(index)}
        className="absolute top-0 right-3 z-10 hidden group-hover:flex 
                   bg-red-500 text-white rounded-full w-5 h-5 
                   items-center justify-center text-xs"
            >
              ✕
            </button>
            <h2 className="text-1xl">{card.label}</h2>
            <Image src={`/cards/${card.id}.png`} alt={card.label} height={128} width={500} />
          </div>
        ) : (
          <div className="border-dashed border-2 border-gray-400 h-32 rounded-xl" /> 
        )}
        </div>

        ))}
      </div>
    </div>
  );
}
