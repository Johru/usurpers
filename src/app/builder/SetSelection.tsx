
import { useState } from 'react';
import { CARDS, SET_NAMES, Card } from '@/lib/categories';

type Props = {
  onSelectCard: (sub: Card) => void;
};

export default function CategorySelection({onSelectCard}: Props)
{



  const [selectedCard, setselectedCard] = useState<string>('shadow');

  const subcategories: Card[] =
    CARDS[selectedCard] ?? [];

  const handleCardClick = (sub: Card) => {
    onSelectCard(sub); 
    console.log('clicked subcategory', sub.id);
  };

  return (
    <div className="flex w-full  justify-self-end mt-1  gap-1">
      <div className="bg-(--panelbg) w-full rounded-2xl py-5 justify-self-end px-5 ">
        
          <span className='text-2xl py-3'>Set</span>
        
       
       
        <div className="mt-2 rounded-lg bg-(--panelbg-dark) p-3 text-sm w-50 "> 
          <ul className="space-y-1 [&>li]:w-40 w-40">
             {Object.keys(SET_NAMES).map(cat => (
            <li key={cat}>
              <button
                type="button"
                onClick={() => setselectedCard(cat as string)}
                className={`w-full text-left rounded px-3 py-2 
                  ${cat === selectedCard ? 'bg-(--panelbg-dark)' : 'bg-(--panelbg) hover:bg-(--panelbg-light)'}`}>
                {cat}
              </button>
            </li>
          ))}
          </ul>
        </div>
     
      </div>
      <div className=" flex bg-(--panelbg) rounded-2xl p-4 w-full gap-2">
        <section className="flex-1 rounded-2xl  p-4">
        <h2 className="text-xl mb-3">
          {selectedCard.charAt(0).toUpperCase() + selectedCard.slice(1)}
        </h2>
        <div className="flex flex-wrap gap-2">
          {subcategories.map(sub => (
            <button
              key={sub.id}
              type="button"
              onClick={() => handleCardClick(sub)}
              className="rounded bg-(--panelbg-dark) px-3 py-2 text-sm hover:bg-(--panelbg-light)"
            >
              {sub.label}
            </button>
          ))}

          {subcategories.length === 0 && (
            <p className="text-sm text-stone-300">No cards for this set.</p>
          )}
        </div>
      </section>
      </div>
    </div>
  );
}