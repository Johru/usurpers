
import { useState } from 'react';
import { CARDS, SET_NAMES, Card } from '@/lib/categories';

type Props = {
  onSelectCard: (sub: Card) => void,
  clearSlots: () => void,
};

export default function CategorySelection({onSelectCard, clearSlots}: Props)
{
  const [selectedSet, setselectedSet] = useState<string>('shadow');

const cards: Card[] = CARDS.filter(card => card.sets.includes(selectedSet));

  const handleCardClick = (sub: Card) => {
    onSelectCard(sub); 
    console.log('clicked subcategory', sub.id);
  };

  return (
    <div className="flex w-full  justify-self-end mt-1  gap-1">
      
      <div className="bg-(--panelbg) w-full rounded-2xl py-5 justify-self-end px-5  flex flex-col">  
         <button onClick={() => clearSlots()}
             className=' text-center rounded mb-5 px-3 py-2 bg-(--panelbg-light) hover:bg-(--panelbg) '>Clear selection</button>     
          <span className='text-2xl py-3'>Set</span>
        <div className="mt-2 rounded-lg bg-(--panelbg-dark) p-3 text-sm w-50 grid grid-cols-2 gap-1"> 
             {Object.keys(SET_NAMES).map(cat => (
            <span key={cat}>
              <button
                type="button"
                onClick={() => setselectedSet(cat as string)}
                className={`w-full text-left rounded px-3 py-2 
                  ${cat === selectedSet ? 'bg-(--panelbg-dark)' : 'bg-(--panelbg) hover:bg-(--panelbg-light)'}`}>
                {cat}
              </button>
            </span>

       
          ))}
            
        </div>
     
      </div>
      <div className=" flex bg-(--panelbg) rounded-2xl p-4 w-full gap-2">
        <section className="flex-1 rounded-2xl  p-4">
        <h2 className="text-xl mb-3">
          {selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)}
        </h2>
        <div className="flex flex-wrap gap-2">
          <ul className="flex flex-col gap-2">
          {cards.map(sub => (
            <li key={sub.id}>
            <button
              
              type="button"
              onClick={() => handleCardClick(sub)}
              className="rounded bg-(--panelbg-dark) px-3 py-2 text-sm hover:bg-(--panelbg-light)"
            >
              {sub.label}
            </button>
            </li>
          ))}
          </ul>

          {cards.length === 0 && (
            <p className="text-sm text-stone-300">No cards for this set.</p>
          )}
        </div>
      </section>
      </div>
    </div>
  );
}