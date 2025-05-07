import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Sidebar() {
  const [sidebarColor, setSidebarColor] = useState("bg-gray-800"); // Initial color

  // Function to change the sidebar color
  const handleColorChange = () => {
    setSidebarColor(sidebarColor === "bg-gray-800" ? "bg-blue-800" : "bg-gray-800");
  };

  return (
    <div
      className={`${sidebarColor} w-64 border-r p-4 flex flex-col space-y-4 transition-colors duration-300`}
    >
      <Button variant="outline" asChild>
        <Link href="/dashboard">
          <span className="text-white" onClick={handleColorChange}>📊 Dashboard</span>
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/transactions">
          <span className="text-white" onClick={handleColorChange}>💰 Transactions</span>
        </Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/settings">
          <span className="text-white" onClick={handleColorChange}>⚙️ Settings</span>
        </Link>
      </Button>
    </div>
  );
}
