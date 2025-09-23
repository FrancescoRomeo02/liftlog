"use client";

import { BsFillMoonStarsFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled on mount
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
        <h1 className="text-xl font-bold text-purple-700">LiftLog</h1>
      </Link>
      <ul className="flex items-center">
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
