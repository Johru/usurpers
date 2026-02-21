import cards from '../../public/cards.json';

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
  wealth: 'wealth',
  commoner: 'commoner',
  warrior: 'warrior',
  nobility: 'nobility',
  siege: 'siege',
  expansion: 'expansion',
  crime: 'crime',
  magic: 'magic',
  wilderness: 'wilderness',
  cultist: 'cultist',
  defense: 'defense',
  retinue: 'retinue',
  shadow: 'shadow',
  mercenary: 'mercenary',
  specialist: 'specialist',
  conspiracy: 'conspiracy',
  tactic: 'tactic',
};

export const CARDS: Card[] = cards as Card[];
