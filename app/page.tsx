// /app/page.tsx
"use client";
import { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseItem from "@/components/ExpenseItem";
import ExpenseFilters from "@/components/ExpenseFilters";
import { Expense } from "@/types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date_desc");
  const [isLoading, setIsLoading] = useState(false);

  const load = async () => {
    setIsLoading(true);
    // Connects to the required API query parameters [cite: 26, 28]
    const res = await fetch(`/api/expenses?category=${filter}&sort=${sort}`);
    const data = await res.json();
    setExpenses(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, [filter, sort]);

  // Requirement: Display total of currently visible expenses [cite: 12, 48]
  const totalInCents = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <main className="max-w-2xl mx-auto p-6 md:p-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        Personal Finance Tool
      </h1>

      <ExpenseForm onRefresh={load} />

      <div className="mt-12">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-gray-800">History</h2>
          <div className="text-right">
            <p className="text-sm text-gray-500 font-semibold uppercase">
              Total Visible
            </p>
            <p className="text-2xl font-black text-indigo-600">
              {(totalInCents / 100).toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p>
          </div>
        </div>

        <ExpenseFilters onFilterChange={setFilter} onSortChange={setSort} />

        <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse italic">
              Updating list...
            </div>
          ) : expenses.length > 0 ? (
            expenses.map((exp) => <ExpenseItem key={exp.id} expense={exp} />)
          ) : (
            <p className="p-8 text-center text-gray-400 italic">
              No expenses found matching criteria.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
