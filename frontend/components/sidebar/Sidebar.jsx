import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-4 flex flex-col space-y-4">
      <Button variant="outline" asChild><Link href="/dashboard">📊 Dashboard</Link></Button>
      <Button variant="outline" asChild><Link href="/transactions">💰 Transactions</Link></Button>
      <Button variant="outline" asChild><Link href="/settings">⚙️ Settings</Link></Button>
    </div>
  );
}
