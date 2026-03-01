
import { useState } from 'react';
import { CARDS, SET_NAMES, Card } from '@/lib/categories';

type Props = {
  onSelectCard: (sub: Card) => void,
 
  
};

export default function CategorySelection({onSelectCard}: Props)
{
  const [selectedSet, setselectedSet] = useState<string>('commoner');

  const cards: Card[] = CARDS.filter(card => card.sets.includes(selectedSet));

  const handleCardClick = (sub: Card) => {
    onSelectCard(sub); 
    
  };

  

  return (
    <div className="flex flex-col w-full   justify-self-end mt-1  gap-1">      
      <div className="bg-(--panelbg) rounded-2xl py-2 justify-self-end px-3 flex-col flex gap-0 ">  
            <section className="flex-1 flex-col flex gap-0 rounded-2xl md:p-4">
          <span className='md:text-2xl text-1x1 md:py-3'>Set</span>
         <div className="flex flex-wrap gap-2">
             {Object.keys(SET_NAMES).map(cat => (
            <span key={cat}>
              <button
                type="button"
                onClick={() => setselectedSet(cat as string)}
                 className={` text-left rounded px-3 py-2 whitespace-nowrap text-xs md:text-sm
                  ${cat === selectedSet ? 'bg-(--panelbg-light)' : 'bg-(--panelbg-dark) hover:bg-(--panelbg-light)'}`}>
                {cat}
              </button>
            </span>

       
          ))}   
          </div>         
       </section>
     
      </div>


      <div className="flex bg-(--panelbg) rounded-2xl p-3 md:p-4 w-full gap-2">
        <section className="flex-1 flex-col flex gap-0 rounded-2xl md:p-4">
        <h2 className="md:text-2xl text-1x1 md:py-3">
          {selectedSet.charAt(0).toUpperCase() + selectedSet.slice(1)}
        </h2>
        <div className="flex flex-wrap gap-2">
          <ul className="flex flex-wrap gap-2">
          {cards.map(sub => (
            <li key={sub.id}>
            <button
              
              type="button"
              onClick={() => handleCardClick(sub)}
              className="rounded bg-(--panelbg-dark) px-3 py-2 text-sm hover:bg-(--panelbg-light) whitespace-nowrap"
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