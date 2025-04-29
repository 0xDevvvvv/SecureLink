"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex font-mono border-b-4 min-w-fit border-red-700 items-center justify-between">
        <span className="text-xl text-gray-500 sm:text-2xl font-semibold tracking-wider m-3 hover:cursor-pointer">
          Securelink
        </span>
        <div className="sm:flex hidden m-3 items-center justify-between gap-5">
          <span className="md:text-md lg:text-lg hover:cursor-pointer hover:underline">About</span>
          <span className="md:text-md lg:text-lg hover:cursor-pointer hover:underline">Github</span>
        </div>
        <div className="flex sm:hidden m-3 items-center justify-between gap-5">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
              strokeLinecap="round" strokeLinejoin="round" 
              className="lucide lucide-menu-icon lucide-menu">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden font-mono bg-white border-b border-gray-200 px-4 py-2">
          <span className="block py-2 hover:underline">About</span>
          <span className="block py-2 hover:underline">Github</span>
        </div>
      )}
    </>
  );
}
