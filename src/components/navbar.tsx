"use client";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaUserAlt } from "react-icons/fa";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const darkMode = () => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav className="flex justify-between mb-12 mt-8">
      <Link href="/">
        <h1 className="text-xl font-bold">LiftLog</h1>
      </Link>
      <ul className="flex items-center">
        <li className="cursor-pointer mr-8">
          <Avatar className="text-4xl">
            <AvatarImage src="" />
            <AvatarFallback>
              <FaUserAlt />
            </AvatarFallback>
          </Avatar>
        </li>
        <li>
          <BsFillMoonStarsFill
            className="cursor-pointer text-2xl mr-8"
            onClick={darkMode}
          />
        </li>
      </ul>
    </nav>
  );
}
