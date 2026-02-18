"use client";
import { useState } from "react";
import { CATEGORIES } from "@/types/expense";

export default function ExpenseForm({ onRefresh }: { onRefresh: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const payload = {
      amount: Math.round(parseFloat(fd.get("amount") as string) * 100), // convert to cents
      category: fd.get("category"),
      description: fd.get("description"),
      date: fd.get("date"),
    };

    const rawAmount = parseFloat(fd.get("amount") as string);
    if (rawAmount <= 0) {
      alert("Amount must be greater than zero.");
      setLoading(false);
      return;
    }

    await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    onRefresh();
    (e.target as HTMLFormElement).reset();
    setLoading(false);
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
          className="p-2 border rounded"
        />
        <select name="category" className="p-2 border rounded">
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
          className="p-2 border rounded col-span-2"
        />
        <input
          name="date"
          type="date"
          required
          className="p-2 border rounded col-span-2"
        />
      </div>
      <button
        disabled={loading}
        className="w-full bg-black text-white p-2 rounded hover:opacity-80"
      >
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
}
