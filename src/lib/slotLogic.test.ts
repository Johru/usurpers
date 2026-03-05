import { describe, it, expect } from 'vitest';
import { addCardToSlots } from './slotLogic';
import { Card } from './categories';

const mockCard: Card = { id: 'knights', label: 'Knights', sets: ['warrior', 'nobility'], cost: '3', tier: '1', rules: '' };
const mockCard2: Card = { id: 'assassins', label: 'Assassins', sets: ['crime', 'conspiracy'], cost: '2', tier: '2', rules: '' };
const emptySlots: (Card | null)[] = Array(7).fill(null);

describe('addCardToSlots', () => {
  it('adds card to first empty slot', () => {
    const result = addCardToSlots(emptySlots, mockCard);
    expect(result).not.toBeNull();
    expect(result!.next[0]).toEqual(mockCard);
  });

  it('does not add duplicate card', () => {
    const slots = [mockCard, ...Array(6).fill(null)];
    const result = addCardToSlots(slots, mockCard);
    expect(result).toBeNull();
  });

  it('returns correct emptyIndex', () => {
    const slots = [mockCard, null, ...Array(5).fill(null)];
    const result = addCardToSlots(slots, mockCard2);
    expect(result!.emptyIndex).toBe(1);
  });

  it('clears shapeshifter sets when both conflict with new card', () => {
    const shapeshifter: Card = { id: 'shapeshifters', label: 'Shapeshifters', sets: ['crime', 'conspiracy'], cost: '0', tier: '3', rules: '' };
    const slots = [shapeshifter, ...Array(6).fill(null)];
    const result = addCardToSlots(slots, mockCard2);
    expect(result!.shapeshifterCleared).toBe(true);
    expect(result!.next[0]!.sets).toEqual(['', '']);
  });

  it('does not clear shapeshifter if only one set conflicts', () => {
    const shapeshifter: Card = { id: 'shapeshifters', label: 'Shapeshifters', sets: ['shadow', 'nobility'], cost: '0', tier: '3', rules: '' };
    const slots = [shapeshifter, ...Array(6).fill(null)];
    const result = addCardToSlots(slots, mockCard2);
    expect(result!.shapeshifterCleared).toBe(false);
  });
});
