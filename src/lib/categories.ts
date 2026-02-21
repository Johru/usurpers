export interface Card {
  id: string;
  label: string;
  sets: string[];
}
export interface Set {
  [category: string]: Card[];
}

export interface Set_names {
  [key: string]: string;
}

export const SET_NAMES: Set_names = {
  warrior: 'warrior',
  magic: 'magic',
  shadow: 'shadow',
  nobility: 'nobility',
  defense: 'defense',
  wealth: 'wealth',
  crime: 'crime',
  commoner: 'commoner',
  conspiracy: 'conspiracy',
};

export const CARDS: Set = {
  warrior: [
    { id: 'knights', label: 'Knights', sets: ['warrior', 'nobility'] },
    { id: 'secondsons', label: 'Second Sons', sets: ['warrior', 'mercenary'] },
  ],
  magic: [
    { id: 'royalmages', label: 'royalmages', sets: ['magic', 'nobility'] },
    { id: 'alchemists', label: 'Alchemists', sets: ['magic', 'wealth'] },
    { id: 'priests', label: 'Priests', sets: ['magic', 'defense'] },
    { id: 'illusionists', label: 'Illusionists', sets: ['magic', 'crime'] },
    { id: 'wraiths', label: 'Wraiths', sets: ['magic', 'shadow'] },
  ],
  shadow: [
    { id: 'vampires', label: 'Vampires', sets: ['shadow', 'cultist'] },
    { id: 'assassins', label: 'Assassins', sets: ['shadow', 'conspiracy'] },
  ],
};
