'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/lib/categories';

type SavedSelection = {
  id: number;
  name: string;
  slots: Card[];
};

export default function SavedPage() {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedSelection[]>(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('savedSelections') ?? '[]');
  });

  const removeEntry = (id: number) => {
    const updated = saved.filter(entry => entry.id !== id);
    localStorage.setItem('savedSelections', JSON.stringify(updated));
    setSaved(updated);
  };

  const editEntry = (entry: SavedSelection) => {
    localStorage.setItem('pendingEdit', JSON.stringify(entry));
    router.push('/builder');
  };

  return (
    <table className='table-auto border-collapse border border-gray-400 w-full text-sm md:text-base'>
      <thead>
        <tr>
          <th className="border border-gray-400 px-2 py-1">Actions</th>
          <th className="border border-gray-400 px-2 py-1">Name</th>
          <th className="border border-gray-400 px-2 py-1" colSpan={7}>Cards</th>
         
        </tr>
      </thead>
      <tbody>
        {saved.map(entry => (
          <tr key={entry.id}>
            <td className="border border-gray-400 px-2 py-1 text-center">
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => editEntry(entry)}
                  className="text-center rounded px-2 py-1 bg-(--panelbg-light) hover:bg-(--panelbg)"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="text-center rounded px-2 py-1 bg-(--panelbg-light) hover:bg-(--panelbg)"
                >
                  Remove
                </button>
              </div>
            </td>
            <td className="border border-gray-400 px-2 py-1 text-center font-bold md:text-2xl">
              {entry.name}
            </td>
            {Array.from({ length: 7 }, (_, i) => (
              <td key={i} className="border border-gray-400 px-2 py-1 text-center">
                {entry.slots[i]?.label ?? ''}
              </td>
            ))}
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}