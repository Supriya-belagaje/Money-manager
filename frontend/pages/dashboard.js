import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const summary = {
    income: 50000,
    expenses: 30000,
    balance: 20000,
  };

  const dailyExpensesData = [
    { time: "9 AM", expense: 300 },
    { time: "12 PM", expense: 600 },
    { time: "3 PM", expense: 500 },
    { time: "6 PM", expense: 700 },
    { time: "9 PM", expense: 400 },
  ];

  const monthlyExpensesData = Array.from({ length: 30 }, (_, i) => ({
    day: (i + 1).toString(),
    expense: Math.floor(Math.random() * 1000) + 500,
  }));

  const yearlyExpensesData = [
    { month: "Jan", expense: 2500 },
    { month: "Feb", expense: 1800 },
    { month: "Mar", expense: 3000 },
    { month: "Apr", expense: 2200 },
    { month: "May", expense: 2700 },
    { month: "Jun", expense: 3200 },
    { month: "Jul", expense: 2100 },
    { month: "Aug", expense: 2900 },
    { month: "Sep", expense: 2600 },
    { month: "Oct", expense: 3100 },
    { month: "Nov", expense: 2300 },
    { month: "Dec", expense: 2800 },
  ];

  const totalExpensesData = [
    { year: "2021", expense: 24000 },
    { year: "2022", expense: 28000 },
    { year: "2023", expense: 31000 },
    { year: "2024", expense: 30000 },
  ];

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="flex gap-2 bg-gray-200 p-1 rounded-md mb-4">
              <TabsTrigger value="daily" className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2">Daily</TabsTrigger>
              <TabsTrigger value="monthly" className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2">Yearly</TabsTrigger>
              <TabsTrigger value="total" className="flex-1 text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-md px-3 py-2">Total</TabsTrigger>
            </TabsList>

            <div className="mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="p-2 border rounded w-full max-w-sm"
              />
            </div>

            <TabsContent value="daily">
              <h3 className="text-lg font-semibold mb-2">Daily Expenses (Time-wise)</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dailyExpensesData}>
                    <defs>
                      <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="expense" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDaily)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="monthly">
              <h3 className="text-lg font-semibold mb-2">Monthly Expenses (Day-wise)</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyExpensesData}>
                    <defs>
                      <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="expense" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMonthly)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="yearly">
              <h3 className="text-lg font-semibold mb-2">Yearly Expenses (Month-wise)</h3>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearlyExpensesData}>
                    <defs>
                      <linearGradient id="colorYearly" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="expense" stroke="#3b82f6" fillOpacity={1} fill="url(#colorYearly)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="total">
              <h3 className="text-lg font-semibold mb-2">Total Expenses Over Years</h3>
              <div className="w-full h-64 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={totalExpensesData}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="expense" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

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