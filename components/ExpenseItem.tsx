// /components/ExpenseItem.tsx
import { Expense } from "@/types/expense";

export default function ExpenseItem({ expense }: { expense: Expense }) {
  // Real money handling: Convert cents back to currency for display [cite: 33]
  const displayAmount = (expense.amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className="flex justify-between items-center p-4 bg-white border-b last:border-0 hover:bg-gray-50 transition-colors">
      <div>
        <p className="font-semibold text-gray-900">{expense.description}</p>
        <div className="flex gap-2 text-xs text-gray-500 mt-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded">
            {expense.category}
          </span>
          <span>{new Date(expense.date).toLocaleDateString()}</span>
        </div>
      </div>
      <p className="font-bold text-lg text-gray-800">{displayAmount}</p>
    </div>
  );
}
