import { Card, SET_NAMES } from "@/lib/categories";

type Props = {
  slots: (Card | null)[];
  selectedCard: Card | null;
  setSlots: React.Dispatch<React.SetStateAction<(Card | null)[]>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | null>>;
};
export default function StatsSidebar({ slots, selectedCard, setSlots, setSelectedCard }: Props) {

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

const NEWLINE_BEFORE = ['Any action:', 'Battle:', 'Move:', 'Tax:', 'Cleanup:', 'Final Scoring:', 'Extract:','Lock:'];

const KEYWORD_STYLES: { keywords: string[]; className: string }[] = [
  { keywords: ['Any action:', 'Move:', 'Extract'], className: 'font-bold text-indigo-400' },
  { keywords: ['Battle:'], className: 'font-bold text-red-400' },
  { keywords: ['Tax:'], className: 'font-bold text-orange-400' },
  { keywords: ['Final Scoring:'], className: 'font-bold text-orange-950' },
  { keywords: ['Ranged', 'Melee', 'Aftermath', 'Start of Battle', 'Cleanup:', 'Lock'], className: 'font-bold' },
];

const SET_KEYWORDS = Object.values(SET_NAMES);

function highlightKeywords(text: string): React.ReactNode[] {
  const allKeywords = [
    ...KEYWORD_STYLES.flatMap(s => s.keywords),
    ...SET_KEYWORDS,
  ];

  
  const sorted = allKeywords.sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');

  return text.split(regex).map((part, i) => {
 
  for (const { keywords, className } of KEYWORD_STYLES) {
      if (keywords.includes(part)) {
        return (
          <span key={i}>
            {NEWLINE_BEFORE.includes(part) && <br />}
            <span className={className}>{part}</span>
          </span>
        );
      }
    }
    if (SET_KEYWORDS.includes(part)) {
      return <span key={i} className="italic text-yellow-700">{part}</span>;
    }
    return part;
  });
}

const firstSet = selectedCard?.sets?.[0] ?? '';

const cardsWithFirstSet = slots
  .filter((s): s is Card => s !== null && s.label !== 'Shapeshifters' && s.sets.includes(firstSet));

const excludedSets = new Set([
    firstSet,
    ...cardsWithFirstSet.flatMap(s => s.sets)
]);

const onShapeshifterChange = (position: 0 | 1, value: string) => {
  setSlots(prev => {
    const next = [...prev];
    const shapeshifterIndex = next.findIndex(s => s?.label === 'Shapeshifters');
    if (shapeshifterIndex === -1) return prev;

    const current = next[shapeshifterIndex]!;
    const newSets: [string, string] = [...(current.sets ?? ['', ''])] as [string, string];
    newSets[position] = value;

    const updated = { ...current, sets: newSets };
    next[shapeshifterIndex] = updated;
    setSelectedCard(updated); 
    return next;
  });
};


  return (
    <div className="flex gap-1 h-full">

      <div className="flex-1 bg-(--panelbg) w-full rounded-2xl  md:py-5 py-2 justify-self-end md:px-5 sm:px-3 px-3 mt-1 ">
        <h2 className='md:text-2xl text-lg md:py-3'>Count</h2>
        <ul>
          {sortedCategories.map(([setId, count]) => (
            <li key={setId} className="text-xs md:text-sm whitespace-nowrap">
              {setId}: {count}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-2 bg-(--panelbg) w-full text-xs md:text-sm rounded-2xl min-w-[200px] py-5 justify-self-end px-3 md:px-5 mt-1 ">
        {selectedCard ? (
          <>
            <h2 className='md:text-2xl text-lg pt-3'>{selectedCard.label}</h2> 
            <br/>
            <div className='grid grid-cols-2 gap-2'>
              <span>Cost: {selectedCard.cost}</span>
              <span>Tier: {selectedCard.tier}</span>
              <span>Sets:</span> 
              {selectedCard.label === 'Shapeshifters' ? (
              <div className="flex flex-col gap-2">
                <select
                  className={`bg-(--panelbg) ${selectedCard.sets?.[0] ? 'text-white' : 'text-red-500'}`}
                  value={selectedCard.sets?.[0] ?? ''}
                  onChange={e => onShapeshifterChange(0, e.target.value)}
                >
                  <option value="">Select first set</option>
                  {Object.values(SET_NAMES).map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <select
                  value={selectedCard.sets?.[1] ?? ''}
                  onChange={e => onShapeshifterChange(1, e.target.value)}
                  disabled={!firstSet}
                  className={(`bg-(--panelbg) ${selectedCard.sets?.[1] ? 'text-white' : 'text-red-500'}`)}
                >
                  <option value="">Select second set</option>
                  {Object.values(SET_NAMES)
                    .filter(s => s !== 'shapeshifter' && !excludedSets.has(s))
                    .map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              ) : (
                <span>{selectedCard.sets.join(', ')}</span>
              )}
            </div>
            <br/>
            <p>{highlightKeywords(selectedCard.rules)}</p>
          </>
          ) : (
          <p>Click a card to see details</p>
        )}
      </div>
      
    </div>
  );
}