import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import moment from "moment";


const categoryColors = {
  Food: "bg-red-100 text-red-600",
  Household: "bg-yellow-100 text-yellow-700",
  Other: "bg-blue-100 text-blue-600",
};

const TransactionList = ({ transactions }) => {
  return (
    <div className="grid gap-4">
      {transactions?.map((tx) => {
        const isExpense = tx.type === "expense";
        const sign = isExpense ? "-" : "+";
        const color = isExpense ? "text-red-500" : "text-green-600";

        return (
          <Card key={tx._id} className="hover:shadow-lg transition duration-300 rounded-2xl">
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                {isExpense ? (
                  <ArrowDownCircle className={`w-6 h-6 ${color}`} />
                ) : (
                  <ArrowUpCircle className={`w-6 h-6 ${color}`} />
                )}
                <div>
                  <div className="text-lg font-semibold">{sign}₹{tx.amount}</div>
                  <p className="text-sm text-muted-foreground">
                    {moment(tx.datetime).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <Badge className={categoryColors[tx.category] || "bg-gray-100 text-gray-600"}>
                  {tx.category}
                </Badge>
                {tx.note && (
                  <p className="text-xs text-muted-foreground mt-1 italic">{tx.note}</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TransactionList;
