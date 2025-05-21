import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/");
    } else {
      fetch("http://localhost:5000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => setUser({ name: data.name, email: data.email }))
        .catch(() => {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken");
          router.push("/");
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully!");
    router.push("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 text-indigo-900 shadow-sm">
      <Link href="/" className="text-lg font-bold text-indigo-900">
        Money Manager
      </Link>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <UserCircle2 className="w-8 h-8 text-indigo-800" />
          <div className="text-left leading-tight">
            <div className="font-semibold text-indigo-900 text-sm">{user.name}</div>
            <div className="text-indigo-700 text-xs">{user.email}</div>
          </div>
        </div>
        <div className="space-x-2">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-indigo-800 font-bold border hover:text-white hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
