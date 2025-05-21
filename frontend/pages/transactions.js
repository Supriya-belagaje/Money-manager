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
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { toast } from "react-toastify";

export default function Transactions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("daily");

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
      toast.success(data.message || "Deleted successfully!");
    } catch (err) {
      console.error(err);
      // alert("Delete failed");
      toast.error(err.response?.data?.message || "Delete failed!");

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
      toast.success(data.message || `Transaction ${isEditing ? `edited`:`added`} successfully!`);
    } catch (err) {
      console.error(err);
      // alert("Error saving transaction");
      toast.error(err.response?.data?.message || "Error saving transaction!");
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
            <div className="mb-4 display flex flex-col sm:flex-row items-center justify-between">
              {/* Filter Tabs */}
              <div className="mb-4">
                <div className="inline-flex rounded-md shadow-sm bg-gray-200 overflow-hidden">
                  {["daily", "monthly", "yearly", "all"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFilter(type)}
                      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${selectedFilter === type
                        ? "bg-indigo-700 text-white"
                        : "text-gray-700 hover:bg-indigo-200"
                        }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              {/* Form Button */}
              <div className="w-full sm:w-1/3 mb-4 display flex justify-end">
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                  onClick={() => {
                    setEditTransaction(null);
                    setShowForm(true);
                  }}
                >
                  Add Transaction
                </Button>
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
              <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl p-6 border-none [&>button[data-radix-dialog-close]]:hidden">
                {/* <DialogClose asChild>
                  <button className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                    <X className="h-5 w-5" />
                  </button>
                </DialogClose> */}
                <DialogHeader>
                  <DialogTitle className="text-2xl font-extrabold text-indigo-600 text-center">
                    {/* {editTransaction ? "Edit Transaction" : "Add Transaction"} */}
                    {!!editTransaction ? "Edit Transaction" : "Add Income or Expense"}

                  </DialogTitle>
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
