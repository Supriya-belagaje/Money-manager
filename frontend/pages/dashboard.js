// import React, { useState, useEffect } from "react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { Card } from "@/components/ui/card";
// import Sidebar from "../components/sidebar/Sidebar";
// import Navbar from "@/components/navbar/navbar";

// const Dashboard = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [transactions, setTransactions] = useState([]);
//   const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const res = await fetch("http://localhost:5000/api/transactions", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch");

//         const json = await res.json();
//         setTransactions(json.transactions || []);
//         processSummary(json.transactions || []);
//       } catch (err) {
//         console.error("Fetch failed", err);
//       }
//     };

//     fetchTransactions();
//   }, []);

//   const processSummary = (txns) => {
//     let income = 0,
//       expenses = 0;
//     txns.forEach((txn) => {
//       if (txn.type === "income") income += txn.amount;
//       else expenses += txn.amount;
//     });
//     setSummary({
//       income,
//       expenses,
//       balance: income - expenses,
//     });
//   };

//   const groupByDateAndType = (txns, keyFn) => {
//     const grouped = {};
//     txns.forEach((txn) => {
//       const key = keyFn(txn);
//       if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
//       if (txn.type === "income") grouped[key].income += txn.amount;
//       else grouped[key].expense += txn.amount;
//     });
//     return grouped;
//   };

//   const formatDate = (d) => {
//     const dateObj = new Date(d);
//     if (isNaN(dateObj)) return "Invalid Date";
//     return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
//       2,
//       "0"
//     )}-${String(dateObj.getDate()).padStart(2, "0")}`;
//   };

//   const selectedDateStr = formatDate(selectedDate);

//   const getAllDaysInMonth = (year, month) => {
//     const days = [];
//     const totalDays = new Date(year, month, 0).getDate();
//     for (let i = 1; i <= totalDays; i++) {
//       days.push(i);
//     }
//     return days;
//   };

//   const monthNames = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   const dailyData = Object.entries(
//     groupByDateAndType(
//       transactions.filter((t) => formatDate(t.datetime) === selectedDateStr),
//       (t) => formatDate(t.datetime)
//     )
//   )
//     .sort((a, b) => new Date(a[0]) - new Date(b[0]))
//     .map(([time, { income, expense }]) => ({ time, income, expense }));

//   const monthlyRawData = groupByDateAndType(
//     transactions.filter(
//       (t) =>
//         new Date(t.datetime).getFullYear() === selectedYear &&
//         new Date(t.datetime).getMonth() === selectedMonth - 1
//     ),
//     (t) => new Date(t.datetime).getDate()
//   );

//   const monthlyData = getAllDaysInMonth(selectedYear, selectedMonth).map((day) => ({
//     day,
//     income: monthlyRawData[day]?.income || 0,
//     expense: monthlyRawData[day]?.expense || 0,
//   }));

//   const yearlyRawData = groupByDateAndType(
//     transactions.filter((t) => new Date(t.datetime).getFullYear() === selectedYear),
//     (t) => new Date(t.datetime).getMonth()
//   );

//   const yearlyData = monthNames.map((monthName, index) => ({
//     month: monthName,
//     income: yearlyRawData[index]?.income || 0,
//     expense: yearlyRawData[index]?.expense || 0,
//   }));

//   // Pie chart data
//   const pieData = [
//     { name: "Income", value: summary.income },
//     { name: "Expenses", value: summary.expenses },
//     { name: "Balance", value: summary.balance },
//   ];

//   const COLORS = ["#00a63e", "#c10007", "#1447e6"]; // Green, Red, Blue for income, expense, balance

//   return (
//     <>
//       <Navbar />
//       <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
//         <Sidebar />
//         <main className="flex-1 px-8 py-6">
//           <h2 className="text-3xl font-extrabold text-gray-800 mb-6 tracking-tight">
//             📊 Dashboard Overview
//           </h2>

//           <Tabs defaultValue="daily" className="w-full">
//             <TabsList className="grid grid-cols-4 bg-white border border-gray-300 rounded-lg overflow-hidden mb-6 shadow-md">
//               {["daily", "monthly", "yearly", "total"].map((tab) => (
//                 <TabsTrigger
//                   key={tab}
//                   value={tab}
//                   className="text-center text-sm font-medium py-2 px-4 transition-colors duration-200 hover:bg-blue-100 hover:text-black data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-800"
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </TabsTrigger>
//               ))}
//             </TabsList>

//             {/* DAILY */}
//             <TabsContent value="daily">
//               <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
//                 <DatePicker
//                   selected={selectedDate}
//                   onChange={(date) => setSelectedDate(date)}
//                   className="w-full max-w-xs border border-blue-300 rounded-md p-2 text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//                 <ResponsiveContainer width="100%" height={250}>
//                   <AreaChart data={dailyData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="time" />
//                     <YAxis />
//                     <Tooltip />
//                     <Area
//                       type="monotone"
//                       dataKey="income"
//                       stroke="#16a34a"
//                       fillOpacity={0.5}
//                       fill="#bbf7d0"
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey="expense"
//                       stroke="#dc2626"
//                       fillOpacity={0.5}
//                       fill="#fecaca"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </TabsContent>

//             {/* MONTHLY */}
//             <TabsContent value="monthly">
//               <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
//                 <select
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="w-full max-w-xs border border-blue-300 rounded-md p-2 text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   <option value="">Select Month</option>
//                   {Array.from({ length: 12 }, (_, i) => (
//                     <option key={i} value={i + 1}>
//                       {new Date(0, i).toLocaleString("default", { month: "long" })}
//                     </option>
//                   ))}
//                 </select>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <AreaChart data={monthlyData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="day" />
//                     <YAxis />
//                     <Tooltip />
//                     <Area
//                       type="monotone"
//                       dataKey="income"
//                       stroke="#16a34a"
//                       fillOpacity={0.5}
//                       fill="#bbf7d0"
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey="expense"
//                       stroke="#dc2626"
//                       fillOpacity={0.5}
//                       fill="#fecaca"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </TabsContent>

//             {/* YEARLY */}
//             <TabsContent value="yearly">
//               <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                   className="w-full max-w-xs border border-blue-300 rounded-md p-2 text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   {Array.from({ length: 10 }, (_, i) => (
//                     <option key={i} value={new Date().getFullYear() - i}>
//                       {new Date().getFullYear() - i}
//                     </option>
//                   ))}
//                 </select>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <AreaChart data={yearlyData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Area
//                       type="monotone"
//                       dataKey="income"
//                       stroke="#16a34a"
//                       fillOpacity={0.5}
//                       fill="#bbf7d0"
//                     />
//                     <Area
//                       type="monotone"
//                       dataKey="expense"
//                       stroke="#dc2626"
//                       fillOpacity={0.5}
//                       fill="#fecaca"
//                     />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </TabsContent>

//             {/* TOTAL SUMMARY (PIE CHART WITH DETAILS) */}
//             <TabsContent value="total">
//               <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
//                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Total Overview</h3>

//                 {/* Income, Expense, Balance Blocks */}
//                 <div className="flex space-x-4 mb-6">
//                   <div className="w-1/3 p-4 bg-green-100 border border-green-300 rounded-lg shadow-md">
//                     <h4 className="text-lg font-semibold text-green-700">Income</h4>
//                     <p className="text-xl font-bold text-green-900">₹{summary.income}</p>
//                   </div>
//                   <div className="w-1/3 p-4 bg-red-100 border border-red-300 rounded-lg shadow-md">
//                     <h4 className="text-lg font-semibold text-red-700">Expenses</h4>
//                     <p className="text-xl font-bold text-red-900">₹{summary.expenses}</p>
//                   </div>
//                   <div className="w-1/3 p-4 bg-blue-100 border border-blue-300 rounded-lg shadow-md">
//                     <h4 className="text-lg font-semibold text-blue-700">Balance</h4>
//                     <p className="text-xl font-bold text-blue-900">₹{summary.balance}</p>
//                   </div>
//                 </div>

//                 {/* Pie Chart */}
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
                    
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={50}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }) =>
//                         `${name}: ${(percent * 100).toFixed(0)}%`
//                          }
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend/>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
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
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card } from "@/components/ui/card";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "@/components/navbar/navbar";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0 });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setTransactions(json.transactions || []);
        processSummary(json.transactions || []);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };

    fetchTransactions();
  }, []);

  const processSummary = (txns) => {
    let income = 0,
      expenses = 0;
    txns.forEach((txn) => {
      if (txn.type === "income") income += txn.amount;
      else expenses += txn.amount;
    });
    setSummary({
      income,
      expenses,
      balance: income - expenses,
    });
  };

  const groupBy = (txns, keyFn) => {
    const grouped = {};
    txns.forEach((txn) => {
      const key = keyFn(txn);
      if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
      if (txn.type === "income") grouped[key].income += txn.amount;
      else grouped[key].expense += txn.amount;
    });
    return grouped;
  };

  const formatDate = (d) => {
    const dateObj = new Date(d);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")}`;
  };

  const selectedDateStr = formatDate(selectedDate);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const dailyData = Object.entries(
    groupBy(transactions.filter(t => formatDate(t.datetime) === selectedDateStr), t => formatDate(t.datetime))
  ).map(([time, { income, expense }]) => ({ time, income, expense }));

  const monthlyRawData = groupBy(
    transactions.filter(
      (t) =>
        new Date(t.datetime).getFullYear() === selectedYear &&
        new Date(t.datetime).getMonth() === selectedMonth - 1
    ),
    (t) => new Date(t.datetime).getDate()
  );

  const monthlyData = Array.from({ length: getDaysInMonth(selectedYear, selectedMonth) }, (_, i) => {
    const day = i + 1;
    return {
      day,
      income: monthlyRawData[day]?.income || 0,
      expense: monthlyRawData[day]?.expense || 0,
    };
  });

  const yearlyRawData = groupBy(
    transactions.filter((t) => new Date(t.datetime).getFullYear() === selectedYear),
    (t) => new Date(t.datetime).getMonth()
  );

  const yearlyData = monthNames.map((month, i) => ({
    month,
    income: yearlyRawData[i]?.income || 0,
    expense: yearlyRawData[i]?.expense || 0,
  }));

  const pieData = [
    { name: "Income", value: summary.income },
    { name: "Expenses", value: summary.expenses },
    { name: "Balance", value: summary.balance },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#3b82f6"];

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">📈 Finance Dashboard</h2>

          <Tabs defaultValue="daily" className="w-full">
  <TabsList className="inline-flex items-center bg-white border border-gray-300 rounded-full p-1 mb-6 shadow-sm">
  {["Daily", "Monthly", "Yearly", "Total"].map((tab) => (
    <TabsTrigger
      key={tab}
      value={tab.toLowerCase()}
      className="capitalize px-4 py-2 text-sm font-medium rounded-full text-gray-700 transition-all duration-300 ease-in-out 
                 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      {tab}
    </TabsTrigger>
  ))}
</TabsList>




            <TabsContent value="daily">
              <Card className="p-4">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="mb-4 border border-blue-400 rounded p-2"
                />
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="income" stroke="#22c55e" fill="#bbf7d0" />
                    <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#fecaca" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="monthly">
              <Card className="p-4">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="mb-4 border border-blue-400 rounded p-2"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {monthNames[i]}
                    </option>
                  ))}
                </select>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="income" stroke="#22c55e" fill="#bbf7d0" />
                    <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#fecaca" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="yearly">
              <Card className="p-4">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="mb-4 border border-blue-400 rounded p-2"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="income" stroke="#22c55e" fill="#bbf7d0" />
                    <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#fecaca" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            <TabsContent value="total">
              <Card className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-100 p-4 rounded-xl text-center shadow">
                    <h4 className="text-lg font-medium text-green-700">Total Income</h4>
                    <p className="text-2xl font-bold text-green-900">₹{summary.income}</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-xl text-center shadow">
                    <h4 className="text-lg font-medium text-red-700">Total Expenses</h4>
                    <p className="text-2xl font-bold text-red-900">₹{summary.expenses}</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-xl text-center shadow">
                    <h4 className="text-lg font-medium text-blue-700">Total Balance</h4>
                    <p className="text-2xl font-bold text-blue-900">₹{summary.balance}</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
