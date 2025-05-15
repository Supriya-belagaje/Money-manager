import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import TransactionForm from "@/components/transactionForm/TransactionForm";
import TransactionList from "@/components/transactionList";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Transactions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [editTransaction, setEditTransaction] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch data");

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

  // Filter logic
  const getFilteredTransactions = () => {
    if (!data?.transactions) return [];
    const now = new Date();

    return data.transactions.filter((tx) => {
      const txDate = new Date(tx.datetime);
      switch (selectedFilter) {
        case "daily":
          return txDate.toDateString() === now.toDateString();
        case "monthly":
          return (
            txDate.getMonth() === now.getMonth() &&
            txDate.getFullYear() === now.getFullYear()
          );
        case "yearly":
          return txDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  };

  const filteredTransactions = getFilteredTransactions();

  const handleEdit = (tx) => {
    setEditTransaction(tx);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setData((prev) => ({
        ...prev,
        transactions: prev.transactions.filter((t) => t._id !== id),
      }));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleFormSubmit = async (formData, isEditing) => {
    const token = localStorage.getItem("authToken");
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `http://localhost:5000/api/transactions/${editTransaction._id}`
      : "http://localhost:5000/api/transactions";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save transaction");

      const updated = await res.json();

      setData((prev) => {
        if (!prev) return prev;
        let newTransactions = [];

        if (isEditing) {
          newTransactions = prev.transactions.map((t) =>
            t._id === updated._id ? updated : t
          );
        } else {
          newTransactions = [updated, ...prev.transactions];
        }

        return {
          ...prev,
          transactions: newTransactions,
        };
      });

      setEditTransaction(null);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error saving transaction");
    }
  };

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
            {/* Form Button */}
            <div className="w-full sm:w-1/3 mb-6">
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  setEditTransaction(null);
                  setShowForm(true);
                }}
              >
                Add Transaction
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="mb-4">
              <div className="inline-flex rounded-md shadow-sm bg-gray-200 overflow-hidden">
                {["daily", "monthly", "yearly", "all"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedFilter(type)}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      selectedFilter === type
                        ? "bg-blue-700 text-white"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction List */}
            <TransactionList
              transactions={filteredTransactions}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            {/* Form Dialog */}
            <Dialog open={showForm} onOpenChange={setShowForm}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{editTransaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
    </DialogHeader>

    <TransactionForm
      isEditing={!!editTransaction}
      initialValues={editTransaction}
      onSubmit={handleFormSubmit}
    />
  </DialogContent>
</Dialog>
          </Card>
        </main>
      </div>
    </>
  );
}
