import { Card } from "@/lib/categories";

type Props = {
  slots: (Card | null)[];
  selectedCard: Card | null;
};
export default function StatsSidebar({ slots, selectedCard }: Props) {

const filledSlots = slots.filter(s => s !== null);
const categoryCounts = filledSlots
  .flatMap(card => card.sets)
  .filter(s => s !== '')
  .reduce((acc, setId) => {
    acc[setId] = (acc[setId] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

const sortedCategories = Object.entries(categoryCounts)
  .sort(([, a], [, b]) => b - a);

  return (
    <div className="flex gap-1 h-full">

      <div className="flex-1 bg-(--panelbg) w-full rounded-2xl  py-5 justify-self-end px-5 mt-1 ">
        <h2 className='text-2xl py-3'>Count</h2>
         <ul>
          {sortedCategories.map(([setId, count]) => (
            <li key={setId}>
              {setId}: {count}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-2 bg-(--panelbg) w-full rounded-2xl  py-5 justify-self-end px-5 mt-1 ">
        {selectedCard ? (
          <>
          <h2 className='text-2xl pt-3'>{selectedCard.label}</h2> 
          <p>Cost: {selectedCard.cost}</p>
          <p>{selectedCard.rules}</p>
          </>

          ) : (
          <p>Click a card to see details</p>
        )}
      </div>
      
    </div>
  );
}