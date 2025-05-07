import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import TransactionForm from "@/components/transactionForm/TransactionForm";
import TransactionList from "@/components/transactionList";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [data, setData] = useState(null); // API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken");
  
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h2>

          <Card className="bg-white shadow-md border border-gray-200 p-6 rounded-lg">
            <TransactionForm onSubmit={(data) => console.log("Transaction Added:", data)} />

            <TransactionList transactions={data.transactions || []} />            
          </Card>
        </main>
      </div>
    </>
  );
}
