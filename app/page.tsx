// /app/page.tsx
"use client";
import { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseItem from "@/components/ExpenseItem";
import ExpenseFilters from "@/components/ExpenseFilters";
import CategorySummary from "@/components/CategorySummary";
import Toast, { ToastType } from "@/components/Toast";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Expense } from "@/types/expense";

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date_desc");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: ToastType } | null>(
    null,
  );

  const [hasStarted, setHasStarted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const sessionStarted = sessionStorage.getItem("fenmo_started");
    if (sessionStarted) setHasStarted(true);
    setIsHydrated(true);
  }, []);

  const handleStart = () => {
    sessionStorage.setItem("fenmo_started", "true");
    setHasStarted(true);
  };

  const showToast = (msg: string, type: ToastType = "info") => {
    setToast({ msg, type });
  };

  const load = async (retries = 2) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/expenses?category=${filter}&sort=${sort}`);
      const data = await res.json();

      if (data.length === 0 && filter === "All") {
        const backup = localStorage.getItem("fenmo_backup");
        if (backup) {
          setExpenses(JSON.parse(backup));
          setIsLoading(false);
          return;
        }
      }
      setExpenses(data);
    } catch (err) {
      if (retries > 0) {
        showToast("Connection unstable. Retrying...", "info");
        setTimeout(() => load(retries - 1), 2000);
      } else {
        showToast("Sync Error.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("Deleted", "info");
        load();
      }
    } catch (err) {
      showToast("Error", "error");
    }
  };

  useEffect(() => {
    if (hasStarted) load();
  }, [filter, sort, hasStarted]);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("fenmo_backup", JSON.stringify(expenses));
    }
  }, [expenses]);

  const totalInCents = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  if (!isHydrated) return null;

  // 1. Show Welcome Screen first
  if (!hasStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  // 2. Show Dashboard after clicking "Enter"
  return (
    <main className="max-w-3xl mx-auto p-6 md:p-12 min-h-screen bg-gray-50 text-gray-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-indigo-600">Fenmo AI</h1>
          <button
            onClick={() => setHasStarted(false)}
            className="text-xs text-gray-400 font-bold uppercase hover:text-indigo-600"
          >
            ← Back to Home
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Total Visible
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
          showToast("Success!", "success");
          load();
        }}
      />

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">History</h2>
        <ExpenseFilters onFilterChange={setFilter} onSortChange={setSort} />
        <div className="border rounded-2xl overflow-hidden bg-white shadow-sm min-h-[200px]">
          {isLoading ? (
            <div className="p-12 text-center text-gray-400 animate-pulse italic">
              Syncing...
            </div>
          ) : expenses.length > 0 ? (
            expenses.map((exp) => (
              <ExpenseItem key={exp.id} expense={exp} onDelete={handleDelete} />
            ))
          ) : (
            <div className="p-20 text-center text-gray-400 italic">
              No transactions found.
            </div>
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
