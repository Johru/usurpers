'use client';
import { useState } from 'react';
import { Card } from '@/lib/categories';

type SavedSelection = {
  id: number;
  name: string;
  slots: Card[];
};

export default function SavedPage() {
 const [saved,] = useState<SavedSelection[]>(() => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('savedSelections') ?? '[]');
});

  return (
    <table className='table-auto border-collapse border border-gray-400 w-full'>
      <thead>
      <tr>
        <th className="border border-gray-400 px-2 py-1">Name</th>
        <th className="border border-gray-400 px-2 py-1" colSpan={7}>Cards</th>
        
      </tr>
      </thead>
      {saved.map(entry => (
        <tr key={entry.id}>
          <td className="border border-gray-400 px-2 py-1 text-center text-2xl"><h3>{entry.name}</h3></td>
          {entry.slots.map(card => <td key={card.id}  className="border border-gray-400 px-2 py-1 text-center">{card.label}</td>)}
        </tr>
      ))}
   </table>
  );
}