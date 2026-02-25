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
    <header className="bg-[#24231e] border-b border-[#3a3832] px-4 md:px-30 sm:px-10 py-0">
      <nav className="mx-auto max-w-6xl flex items-center md:justify-between px-0 py-0">
        <div className='flex sm:flex-1 justify-left pr-4 '>
          <h1 className="text-[#e0d6b4] font-serif tracking-wide md:text-3xl sm:text-1xl text-1xl sr-only sm:not-sr-only">
            <span className='whitespace-nowrap'> {title} </span>
          </h1>
        </div>
        <ul className="flex space-x-2 text-[#e0d6b4] flex-1 justify-center ">
          <li>
            <Link href="/builder" className="flex items-center h-full py-5 px-1 hover:bg-stone-500 md:text-4xl sm:text-3xl text-1xl">
              <h2 className='md:text-2xl sm:text-2xl text-1xl'>Builder</h2>
            </Link>
          </li>
          <li>
            <Link href="/saved" className="flex items-center h-full py-0 px-2 hover:bg-stone-500">
               <h2 className='md:text-2xl sm:text-2xl text-1xl'>Saved</h2>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center h-full py-0 px-1 hover:bg-stone-500">
               <h2 className='md:text-2xl sm:text-2xl text-1xl'>Contact</h2>
            </Link>
          </li>
          <li>
            <Link href="/profile" className="flex items-center h-full py-0 px-1 hover:bg-stone-500">
              <h2 className='md:text-2xl sm:text-2xl text-1xl'>Profile</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
