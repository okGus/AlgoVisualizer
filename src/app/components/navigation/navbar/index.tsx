/* eslint-disable react/jsx-key */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  
  const navLink = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/BubbleSort",
      title: "Bubble Sort",
    },
    {
      link: "/InsertionSort",
      title: "Insertion Sort",
    },
    {
      link: "/SelectionSort",
      title: "Selection Sort",
    },
  ];

  return (
    <>
      <div className="w-full h-10 bg-blue-600 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="hidden md:flex gap-x-6 text-white">
              {navLink.map(({link, title}) => (
                <li key={title} className={`${pathname == link ? 'active' : ''} link yap`}>
                  <Link href={link}>
                    <p>{title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;