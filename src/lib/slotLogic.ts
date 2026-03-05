import { Card } from './categories';

export const addCardToSlots = (slots: (Card | null)[], card: Card): { next: (Card | null)[]; emptyIndex: number; shapeshifterCleared: boolean } | null => {
  const isDuplicate = slots.some((s) => s?.id === card.id);
  if (isDuplicate) return null;

  const next = [...slots];
  const emptyIndex = next.findIndex((s) => s === null);
  if (emptyIndex === -1) return null;

  next[emptyIndex] = card;

  let shapeshifterCleared = false;
  const shapeshifterIndex = next.findIndex((s) => s?.label === 'Shapeshifters');
  if (shapeshifterIndex !== -1 && shapeshifterIndex !== emptyIndex) {
    const shapeshifter = next[shapeshifterIndex]!;
    const [first, second] = shapeshifter.sets;
    const newCardSets = new Set(card.sets);
    if (newCardSets.has(first) && newCardSets.has(second)) {
      next[shapeshifterIndex] = { ...shapeshifter, sets: ['', ''] as [string, string] };
      shapeshifterCleared = true;
    }
  }

  return { next, emptyIndex, shapeshifterCleared };
};
