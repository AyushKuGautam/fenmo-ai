"use client";
import { useState } from "react";
import { CATEGORIES } from "@/types/expense";

export default function ExpenseForm({ onRefresh }: { onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const rawAmount = parseFloat(fd.get("amount") as string);
    if (rawAmount <= 0) {
      alert("Amount must be greater than zero.");
      setLoading(false);
      return;
    }

    const payload = {
      amount: Math.round(rawAmount * 100), // convert to cents
      category: fd.get("category"),
      description: fd.get("description"),
      date: fd.get("date"),
    };

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // --- Integrated Logic for Success/Error Feedback ---
      if (res.ok) {
        (e.target as HTMLFormElement).reset();
        // This triggers the load() and showToast() in page.tsx
        onRefresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add expense");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-xl shadow-md space-y-4 border border-gray-100"
    >
      <div className="grid grid-cols-2 gap-4">
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount (e.g. 10.50)"
          required
          className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <select
          name="category"
          className="p-2 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          name="description"
          type="text"
          placeholder="Description"
          required
          className="p-2 border rounded col-span-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <input
          name="date"
          type="date"
          required
          className="p-2 border rounded col-span-2 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-indigo-600 text-white p-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
