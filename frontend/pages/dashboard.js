import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const summary = {
    income: 50000,
    expenses: 30000,
    balance: 20000,
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          {/* Tabs start here */}
          <Tabs defaultValue="daily" className="w-full">
            {/* Tabs bar (only one!) */}
            <TabsList className="flex gap-2 bg-gray-200 p-1 rounded-md mb-4">
              <TabsTrigger
                value="daily"
                className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2"
              >
                Daily
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="yearly"
                className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2"
              >
                Yearly
              </TabsTrigger>
              <TabsTrigger
                value="total"
                className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2"
              >
                Total
              </TabsTrigger>
            </TabsList>

            {/* Date Picker (optional, shown always) */}
            <div className="mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-2 border rounded w-full max-w-sm"
              />
            </div>

            {/* Tab contents */}
            <TabsContent value="daily">
              <p className="text-black-700">Showing Daily breakdown...</p>
            </TabsContent>
            <TabsContent value="monthly">
              <p className="text-black-700">Monthly report goes here...</p>
            </TabsContent>
            <TabsContent value="yearly">
              <p className="text-black-700">Yearly stats appear here...</p>
            </TabsContent>
            <TabsContent value="total">
              <Card className="p-6 bg-blue-50 shadow-md rounded-md">
                <h3 className="text-xl font-semibold mb-2">Total Summary</h3>
                <p className="mb-1 text-green-700">Income: ₹{summary.income.toLocaleString()}</p>
                <p className="mb-1 text-red-700">Expenses: ₹{summary.expenses.toLocaleString()}</p>
                <p className="font-bold text-blue-700">Balance: ₹{summary.balance.toLocaleString()}</p>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
