import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/"); // Redirect to login
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear token
    toast.success("Logged out successfully!");
    router.push("/"); // Redirect to login/home
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="text-lg font-bold">Money Manager</Link>
      <div className="space-x-4">
        <Button variant="ghost" asChild><Link href="/dashboard">Dashboard</Link></Button>
        <Button variant="ghost" asChild><Link href="/transactions">Transactions</Link></Button>
        <Button variant="ghost" asChild><Link href="/settings">Settings</Link></Button>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </div>
    </nav>
  );
}
