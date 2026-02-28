import cards from '../../public/cards.json';

export interface Card {
  id: string;
  label: string;
  sets: string[];
  cost: string;
  rules: string;
}
export interface Set {
  [category: string]: Card[];
}

export interface Set_names {
  [key: string]: string;
}

export const SET_NAMES: Set_names = {
  commoner: 'commoner',
  conspiracy: 'conspiracy',
  crime: 'crime',
  cultist: 'cultist',
  defense: 'defense',
  expansion: 'expansion',
  magic: 'magic',
  mercenary: 'mercenary',
  nobility: 'nobility',
  retinue: 'retinue',
  shadow: 'shadow',
  shapeshifter: 'shapeshifter',
  siege: 'siege',
  tactic: 'tactic',
  warrior: 'warrior',
  wealth: 'wealth',
  wilderness: 'wilderness',
};

export const CARDS: Card[] = cards as Card[];
