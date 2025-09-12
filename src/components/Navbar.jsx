"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoMdArrowForward } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { auth } from "@/lib/firebase"; // your firebase config
import { signOut, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (dropdownRef.current) {
      setMaxHeight(isOpen ? `${dropdownRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Sign out handler
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/listings" },
    { name: "Rent", path: "/listings" },
    { name: "Sell", path: "/listings" },
    { name: "About Us", path: "/" },
    { name: "Contact Us", path: "/" },
  ];

  return (
    <div className="w-full">
      <div className="px-2 lg:px-6 xl:px-[53px] flex justify-between py-6 xl:py-9 items-center">
        <div className="flex flex-row items-center gap-2">
          <img src="./Vector.png" alt="" className="w-7 h-7 lg:w-8 lg:h-8" />
          <div className="font-poppins font-bold text-lg md:text-xl lg:text-2xl text-[#1E1E1E]">
            PropBot
          </div>
        </div>

        <div className="hidden lg:flex flex-row gap-3 xl:gap-4">
          {navItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <div className="px-2 xl:px-4 cursor-pointer">
                <span className="font-poppins font-normal text-base xl:text-[18px] text-[#1E1E1E] hover:text-[#1E3A8A] hover:border-b hover:border-[#1E3A8A]">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {!user ? (
          <div className="hidden lg:flex bg-[#1E3A8A] items-center justify-center px-4 xl:px-5 py-2 lg:py-[10px] rounded-3xl cursor-pointer gap-2">
            <Link
              href="/login"
              className="font-poppins font-normal text-sm xl:text-[18px] text-center text-white hover:underline"
            >
              Login
            </Link>
            <span className="text-white">/</span>
            <Link
              href="/signup"
              className="font-poppins font-normal text-sm xl:text-[18px] text-center text-white hover:underline"
            >
              Register
            </Link>
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 rounded-full border border-white text-white flex items-center justify-center">
                <IoMdArrowForward className="text-[12px]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4 rounded-3xl border border-[#1E3A8A] px-4 py-2 font-poppins font-normal text-[#1E3A8A]">
            <span>Hello, {user.displayName || user.email}</span>
            <button
              onClick={handleLogout}
              className="text-[#1E3A8A] hover:underline cursor-pointer"
              type="button"
            >
              Logout
            </button>
          </div>
        )}

        <div
          className="lg:hidden flex items-center cursor-pointer z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <HiX className="text-3xl text-[#1E1E1E]" />
          ) : (
            <HiMenu className="text-3xl text-[#1E1E1E]" />
          )}
        </div>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{ maxHeight: maxHeight }}
          className="overflow-hidden transition-max-height duration-300 ease-in-out bg-white shadow-xl rounded-xl flex flex-col items-center py-6 z-50 lg:hidden"
        >
          {navItems.map((item, index) => (
            <Link key={index} href={item.path}>
              <div className="py-2 text-lg font-poppins font-medium text-[#1E1E1E] hover:text-[#1E3A8A] cursor-pointer transition hover:scale-105 w-full text-center">
                {item.name}
              </div>
            </Link>
          ))}

          {!user ? (
            <div className="mt-4 bg-[#1E3A8A] flex items-center justify-center px-7 py-3 rounded-full cursor-pointer gap-2 shadow-lg w-full max-w-xs mx-auto">
              <Link
                href="/login"
                className="font-poppins font-semibold text-white hover:underline"
              >
                Login
              </Link>
              <span className="text-white">/</span>
              <Link
                href="/signup"
                className="font-poppins font-semibold text-white hover:underline"
              >
                Register
              </Link>
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border border-white text-white flex items-center justify-center">
                  <IoMdArrowForward className="text-[15px]" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 bg-[#1E3A8A] flex items-center justify-center px-7 py-3 rounded-full cursor-pointer gap-4 shadow-lg w-full max-w-xs mx-auto font-poppins font-normal text-white">
              <span>Hello, {user.displayName || user.email}</span>
              <button
                onClick={handleLogout}
                className="underline"
                type="button"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
