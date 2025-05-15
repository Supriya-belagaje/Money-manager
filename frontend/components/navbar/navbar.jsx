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
      router.push("/"); // Redirect to login if token is missing
    } else {
      // Fetch user info
     fetch("http://localhost:5000/api/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
        .then((res) => {
          if (!res.ok) {
            throw new Error("Unauthorized");
          }
          return res.json();
        })
        .then((data) => {
          setUser({ name: data.name, email: data.email });
        })
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
  <nav className="flex justify-between items-center p-4 border-b">
    <Link href="/" className="text-lg font-bold">Money Manager</Link>
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <UserCircle2 className="w-8 h-8 text-white-700" />
        <div className="text-left leading-tight">
          <div className="font-semibold text-white-800 text-sm">{user.name}</div>
          <div className="text-white-500 text-xs">{user.email}</div>
        </div>
      </div>
      <div className="space-x-2">
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  </nav>
);
}
