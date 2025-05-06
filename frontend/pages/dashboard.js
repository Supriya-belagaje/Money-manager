import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "@/components/navbar/navbar";



const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dailyData = [
    { time: "9 AM", amount: 200 },
    { time: "12 PM", amount: 400 },
    { time: "3 PM", amount: 300 },
    { time: "6 PM", amount: 500 },
    { time: "9 PM", amount: 200 },
  ];

  const monthlyData = [
    { date: "1st", amount: 2000 },
    { date: "5th", amount: 4000 },
    { date: "10th", amount: 3000 },
    { date: "15th", amount: 5000 },
    { date: "20th", amount: 2000 },
  ];

  const yearlyData = [
    { month: "Jan", amount: 20000 },
    { month: "Feb", amount: 24000 },
    { month: "Mar", amount: 21000 },
    { month: "Apr", amount: 25000 },
    { month: "May", amount: 22000 },
  ];

  const summary = {
    income: 100000,
    expenses: 70000,
    balance: 30000,
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date:
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full max-w-xs border border-gray-300 rounded-md p-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid grid-cols-4 bg-white border border-gray-300 rounded-lg overflow-hidden mb-6 shadow-sm">
            {["daily", "monthly", "yearly", "total"].map((tab) => (
              <TabsTrigger
  key={tab}
  value={tab}
  className="text-center text-sm font-medium py-2 px-4 transition-colors duration-200 ease-in-out hover:bg-blue-100 hover:text-black data-[state=active]:bg-blue-600 data-[state=active]:text-black text-gray-800"
>
  {tab.charAt(0).toUpperCase() + tab.slice(1)}
</TabsTrigger>

            ))}
          </TabsList>

          <TabsContent value="daily">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    fill="#bfdbfe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#10b981"
                    fill="#6ee7b7"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="yearly">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#f59e0b"
                    fill="#fde68a"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="total">
            <Card className="p-6 bg-white border border-gray-200 shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Total Summary</h3>
              <div className="space-y-2 text-sm">
                <p className="text-green-600 font-medium">
                  Income: ₹{summary.income.toLocaleString()}
                </p>
                <p className="text-red-600 font-medium">
                  Expenses: ₹{summary.expenses.toLocaleString()}
                </p>
                <p className="text-blue-700 font-bold text-base">
                  Balance: ₹{summary.balance.toLocaleString()}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </>
  );
};
export default Dashboard;
