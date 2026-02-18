// /app/page.tsx (Updated)
"use client";
import { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseItem from "@/components/ExpenseItem";
import ExpenseFilters from "@/components/ExpenseFilters";
import CategorySummary from "@/components/CategorySummary";
import Toast, { ToastType } from "@/components/Toast";
import { Expense } from "@/types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date_desc");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(
    null,
  );

  const showToast = (msg: string, type: ToastType = "info") => {
    setToast({ msg, type });
  };

  const load = async (retries = 2) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/expenses?category=${filter}&sort=${sort}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      if (retries > 0) {
        showToast("Connection unstable. Retrying...", "info");
        setTimeout(() => load(retries - 1), 2000);
      } else {
        showToast(
          "Failed to load expenses. Please check your network.",
          "error",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter, sort]);

  const totalInCents = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <main className="max-w-3xl mx-auto p-6 md:p-12 min-h-screen bg-gray-50 text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Fenmo AI</h1>
          <p className="text-gray-500">Production-Ready Expense Tracker</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase">
            Grand Total
          </p>
          <p className="text-3xl font-black text-indigo-600">
            {(totalInCents / 100).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      </div>

      <CategorySummary expenses={expenses} />

      <ExpenseForm
        onRefresh={() => {
          showToast("Expense added successfully!", "success");
          load();
        }}
      />

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>
        <ExpenseFilters onFilterChange={setFilter} onSortChange={setSort} />

        <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
          {isLoading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse italic">
              Syncing with server...
            </div>
          ) : expenses.length > 0 ? (
            expenses.map((exp) => <ExpenseItem key={exp.id} expense={exp} />)
          ) : (
            <p className="p-12 text-center text-gray-400 italic">
              No transactions found.
            </p>
          )}
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
