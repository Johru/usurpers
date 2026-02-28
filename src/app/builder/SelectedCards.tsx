
import { Card } from '@/lib/categories';
import Image from 'next/image';
import { useRef} from 'react';
type Props = {
  slots: (Card | null)[];
  setSlots: React.Dispatch<React.SetStateAction<(Card | null)[]>>;
   clearSlots: () => void,
 
  selectionName: string,
  setSelectionName: (name: string) => void,
  setSelectedCard: (card: Card | null) => void,
  editingId: number | null,
  setEditingId: (id: number | null) => void,
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  toggleActive: (index: number) => void;
};



export default function SelectedCards({ slots=[],toggleActive, setSlots,clearSlots, activeIndex, setActiveIndex,  selectionName, setSelectionName, setSelectedCard, setEditingId, editingId }: Props) {


const handleNew = () => {
 const newId = Date.now();
  setSelectionName('');
  setEditingId(newId);
  const existing = JSON.parse(localStorage.getItem('savedSelections') ?? '[]');
  localStorage.setItem('savedSelections', JSON.stringify([...existing, { id: newId, name: '', slots: [] }]));
};



const dragIndex = useRef<number | null>(null);

const handleDragStart = (index: number ): void => {
  dragIndex.current = index;
};

const handleDrop = (dropIndex: number): void => {
  if (dragIndex.current === null) return;
  const fromIndex = dragIndex.current;
  toggleActive(dropIndex);
  setSelectedCard(slots[fromIndex]);

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

const moveCard = (from: number, to: number) => {
  if (to < 0 || to >= slots.length) return;
  let card= slots[from];
  setSlots(prev => {
    const next = [...prev];
    [next[from], next[to]] = [next[to], next[from]];
    card = next[to];
    return next;
  }); 
  if (card )setSelectedCard(card);
  toggleActive(to);
 
};


  return (

    <div className=" w-full rounded-2xl py-0 ">
       <div className="flex justify-between  md:rounded-2xl rounded-1x1 md:p-4 py-2 w-full gap-2">
         <h1 className="max-w-xs sr-only sm:not-sr-only md: md:text-3xl sm:text-2xl text-1xl font-semibold leading-10 tracking-tight">
          Selected Cards
        </h1>
       <div className='justify-self-end flex gap-2'>
        <button onClick={() => clearSlots()}
             className=' text-center rounded md:px-3 px-2 md:py-2 bg-(--panelbg-light) hover:bg-(--panelbg) max-h-10 '>Clear
        </button>
        {editingId ? (
          <input
            value={selectionName}
            onChange={e => setSelectionName(e.target.value)}
            className="bg-transparent border-b border-gray-400 text-lg font-semibold"
          />
        ) : (
          <span className="text-gray-400 italic">Unsaved</span>
        )}
          <button
            onClick={handleNew}
            className="text-center rounded md:px-3 px-2 md:py-2 bg-(--panelbg-light) hover:bg-(--panelbg) max-h-10"
          >
            New
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
          onClick={() => {
            setSelectedCard(card);
            toggleActive(index);
          }}
  
        >
        {card ? (
          <div className="relative group ">
            {activeIndex === index && (
      <div className="absolute top-5 inset-0 z-10 flex flex-col items-center justify-between p-1">
        <div className="flex justify-between items-center w-full">
      <button
      onClick={(e) => { e.stopPropagation(); moveCard(index, index - 1); }}
      disabled={index === 0}
      className="bg-black/95 text-yellow-300 rounded w-5 h-5 flex items-center justify-center disabled:opacity-20"
    >
      ◀
    </button>
    <button
      onClick={(e) => { e.stopPropagation(); removeCard(index); }}
      className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
    >
      ✕
    </button>
    <button
      onClick={(e) => { e.stopPropagation(); moveCard(index, index + 1); }}
      disabled={index === slots.length - 1}
      className="bg-black/95 text-yellow-300 text-8x1 rounded w-5 h-5 flex items-center justify-center disabled:opacity-20"
    >
      ▶
    </button>
      </div>
      </div>
    )}
            <span className="text-sm whitespace-nowrap">{card.label}</span>
            <Image src={`/cards/${card.id}.webp`} alt={card.label} height={128} width={500} />
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
