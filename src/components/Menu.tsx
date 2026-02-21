'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
    const pathname = usePathname();

  // route → title mapping
  const titles: Record<string, string> = {
    '/': 'Home',
    '/builder': 'Tableau Builder',
    '/saved': 'Saved builds',
    '/contact': 'COntact',
    '/profile': 'Profile',
  };

  const title = titles[pathname] || 'Tableau Builder';

  return (
    <header className="bg-[#24231e] border-b border-[#3a3832] px-30 py-0">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-0 py-0">
        <div className='flex flex-1 justify-left '>
        <h1 className="text-[#e0d6b4] font-serif tracking-wide text-4xl">
          {title}
        </h1>
        </div>
        <ul className="flex space-x-2 text-[#e0d6b4] flex-1 justify-center">
          <li>
            <Link href="/builder" className="flex items-center h-full py-5 px-2 hover:bg-stone-500">
              <h2 className='text-2xl'>Builder</h2>
            </Link>
          </li>
          <li>
            <Link href="/saved" className="flex items-center h-full py-0 px-2 hover:bg-stone-500">
               <h2 className='text-2xl'>Saved</h2>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center h-full py-0 px-1 hover:bg-stone-500">
               <h2 className='text-2xl'>Contact</h2>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center h-full py-0 px-1 hover:bg-stone-500">
              <h2 className='text-2xl'>Profile</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
