import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import TransactionForm from "@/components/transactionForm/TransactionForm";
import { Card } from "@/components/ui/card";
export default function Transactions() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold">Transactions</h2>
          <TransactionForm onSubmit={(data) => console.log("Transaction Added:", data)} />
        </main>
      </div>
    </>
  );
}
