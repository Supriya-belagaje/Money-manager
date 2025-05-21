"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [sidebarColor, setSidebarColor] = useState("bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300");
  const pathname = usePathname();

  const isGray = sidebarColor === "bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300";
  const textColor = "text-white";
  const baseBorder = isGray ? "border-gray-600" : "border-blue-600";
  const baseHover = isGray ? "hover:bg-gray-700" : "hover:bg-blue-700";

  const navItems = [
    { label: "📊 Dashboard", href: "/dashboard" },
    { label: "💰 Transactions", href: "/transactions" },
    // { label: "⚙️ Settings", href: "/settings" },
  ];

  return (
    <div
      className={`${sidebarColor} w-64 border-r p-4 flex flex-col space-y-4 transition-colors duration-300`}
    >
      {navItems.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);
        return (
          <Link href={href} key={href}>
            <Button
              variant={isActive ? "default" : "outline"}
              className={`w-full justify-start cursor-pointer ${
                isActive
                  ? "bg-white text-black font-bold"
                  : `bg-indigo-900 ${textColor} ${baseBorder} ${baseHover}`
              }`}
            >
              {label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
