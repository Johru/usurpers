import { Card } from "@/lib/categories";

type Props = {
  slots: (Card | null)[];
};
export default function StatsSidebar({ slots }: Props) {

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
    <div className="flex gap-1">
      <div className="flex-1 bg-(--panelbg) w-full rounded-2xl  py-5 justify-self-end px-5 mt-1 ">
        <h2 className='text-2xl py-3'>Sets Selected</h2>
         <ul>
          {sortedCategories.map(([setId, count]) => (
            <li key={setId}>
              {setId}: {count}
            </li>
        ))}
        </ul>
      </div>
      
    </div>
  );
}