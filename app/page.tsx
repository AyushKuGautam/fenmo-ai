// /app/page.tsx
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

  const handleDelete = async (id: string) => {
    // Prevent accidental clicks
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Expense deleted successfully", "info");
        load(); // Refresh list to update totals and summary.
      } else {
        showToast("Failed to delete expense", "error");
      }
    } catch (err) {
      showToast("Network error while deleting", "error");
    }
  };

  useEffect(() => {
    load();
  }, [filter, sort]);

  /**
   * Dynamically calculates total for currently visible expenses.
   */
  const totalInCents = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <main className="max-w-3xl mx-auto p-6 md:p-12 min-h-screen bg-gray-50 text-gray-900">
      {/* Header & Grand Total Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Fenmo AI</h1>
          <p className="text-gray-500">Production-Ready Expense Tracker</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Current Total
          </p>
          <p className="text-3xl font-black text-indigo-600">
            {(totalInCents / 100).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      </div>

      {/* Summary per category */}
      <CategorySummary expenses={expenses} />

      {/* Expense Input Form */}
      <ExpenseForm
        onRefresh={() => {
          showToast("Expense added successfully!", "success");
          load();
        }}
      />

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>

        {/* Filtering and Sorting Controls */}
        <ExpenseFilters onFilterChange={setFilter} onSortChange={setSort} />

        {/* List Section: Handles Loading, Empty, and Data states */}
        <div className="border rounded-2xl overflow-hidden bg-white shadow-sm min-h-[200px] flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center p-12 text-gray-400 animate-pulse italic">
              Syncing with server...
            </div>
          ) : expenses.length > 0 ? (
            expenses.map((exp) => (
              <ExpenseItem key={exp.id} expense={exp} onDelete={handleDelete} />
            ))
          ) : (
          
            <div className="flex-1 p-20 text-center">
              <div className="text-gray-300 mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <p className="text-gray-400 italic">
                No transactions yet. Start by adding one above!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Global Toast Notifications */}
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
