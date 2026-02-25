
import { Card } from '@/lib/categories';
import Image from 'next/image';
import { useRef } from 'react';
type Props = {
  slots: (Card | null)[];
  setSlots: React.Dispatch<React.SetStateAction<(Card | null)[]>>;
   clearSlots: () => void,
  saveSelection: () => void,
  selectionName: string,
  setSelectionName: (name: string) => void,
  setSelectedCard: (card: Card | null) => void,
};

export default function SelectedCards({ slots=[], setSlots,clearSlots, saveSelection, selectionName, setSelectionName, setSelectedCard }: Props) {

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

    <div className=" w-full rounded-2xl py-0 ">
       <div className="flex justify-between  md:rounded-2xl rounded-1x1 md:p-4 py-2 w-full gap-2">
         <h1 className="max-w-xs sr-only sm:not-sr-only md: md:text-3xl sm:text-2xl text-1xl font-semibold leading-10 tracking-tight">
          Selected Cards
        </h1>
       <div className='justify-self-end flex gap-2 max-w-xs'>
        <button onClick={() => clearSlots()}
             className=' text-center rounded md:px-3 px-2 md:py-2 bg-(--panelbg-light) hover:bg-(--panelbg) max-h-10 '>Clear
        </button>
        <input
          type="text"
          value={selectionName}
          onChange={e => setSelectionName(e.target.value)}
          placeholder="Name your selection"
          className="border rounded px-2 py-1 max-w-xs"/>
        <button onClick={() => saveSelection()}
             className=' text-center rounded md:px-3 px-2 py-2 bg-(--panelbg-light) hover:bg-(--panelbg) max-h-10'>Save
        </button> 
        </div>
      </div>

      <div className='flex  bg-(--panelbg) rounded-2xl  scroll-pl-2 md:scroll-pl-4 px-2 py-2 md:p-4 w-full gap-2 overflow-x-auto gap-2 pb-2 snap-x snap-mandatory'>
        {slots.map((card, index) => (
        <div
          key={index}
          id={`selectedCard${index + 1}`}
          className="w-[13.5%] h-auto px-0  min-w-[120px] flex-shrink-0 snap-start"
          draggable={card !== null}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
          onClick={() => setSelectedCard(card)} 
  
        >
        {card ? (
          <div className="relative group ">
            <button
              onClick={() => removeCard(index)}
        className="absolute top-0 right-3 z-10 hidden group-hover:flex 
                   bg-red-500 text-white rounded-full w-5 h-5 
                   items-center justify-center text-xs"
            >
              ✕
            </button>
            <span className="text-sm whitespace-nowrap">{card.label}</span>
            <Image src={`/cards/${card.id}.png`} alt={card.label} height={128} width={500} />
          </div>
        ) : (
          <div className="border-dashed border-2 border-gray-400 h-20 rounded-xl" /> 
        )}
        </div>

        ))}
      </div>
    </div>
  );
}
