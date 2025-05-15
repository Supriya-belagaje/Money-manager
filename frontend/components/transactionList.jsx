import { Button } from "@/components/ui/button";
import { ArrowDownCircle, ArrowUpCircle, Trash2, Pencil } from "lucide-react";

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-500">No transactions found.</p>;
  }

  return (
    <div className="mt-4 space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="flex justify-between items-center border p-4 rounded-lg bg-white shadow"
        >
          {/* Left Side */}
          <div className="flex items-start gap-4">
            {tx.type === "income" ? (
              <ArrowUpCircle className="text-green-500" />
            ) : (
              <ArrowDownCircle className="text-red-500" />
            )}
            <div>
              <p
                className={`font-semibold ${
                  tx.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}₹{tx.amount}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(tx.datetime).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Category: <span className="font-medium">{tx.category}</span>
              </p>
              {tx.note && (
                <p className="text-xs text-gray-500 italic">Note: {tx.note}</p>
              )}
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={() => onEdit(tx)}
              className="text-blue-600 border border-blue-300 hover:bg-blue-100"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              onClick={() => onDelete(tx._id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
