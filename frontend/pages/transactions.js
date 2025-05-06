import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import TransactionForm from "@/components/transactionForm/TransactionForm";
import { Card } from "@/components/ui/card";

export default function Transactions() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h2>

          <Card className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
            <TransactionForm onSubmit={(data) => console.log("Transaction Added:", data)} />
          </Card>
        </main>
      </div>
    </>
  );
}
