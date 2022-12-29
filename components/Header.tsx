import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const navMenu = ["Home", "About", "Menu", "Bog", "Contact"];

  const [cardEmpty, setCardEmpty] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCardEmpty(false);
    }
  }, []);

  return (
    <>
      <div className="w-full h-[5rem] bg-black grid grid-cols-1 content-center">
        <div className="mx-[20rem] flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={80} height={50} />
          </Link>
          <div>
            <ul className="flex space-x-10">
              {navMenu.map((menu, index) => (
                <li key={index} className="text-white">
                  {menu}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-5">
            <Image src="/Vector.svg" alt="search" width={20} height={20} />
            <Link href="/cart">
              <button className="">
                <Image src="/Card.svg" alt="cart" width={20} height={20} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
