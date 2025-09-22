"use client";

import { BsFillMoonStarsFill } from "react-icons/bs";

import Link from "next/link";

import { logout } from "@/action/auth";

export default function Navbar() {
  const handleSignOut = async () => {
    await logout();
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
            onClick={handleSignOut}
          />
        </li>
      </ul>
    </nav>
  );
}
