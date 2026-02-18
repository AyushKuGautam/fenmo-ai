// /components/ExpenseItem.tsx
import { Expense } from "@/types/expense";

export default function ExpenseItem({
  expense,
  onDelete,
}: {
  expense: Expense;
  onDelete: (id: string) => void;
}) {
  const displayAmount = (expense.amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className="group flex justify-between items-center p-4 bg-white border-b last:border-0 hover:bg-gray-50 transition-colors">
      <div>
        <p className="font-semibold text-gray-900">{expense.description}</p>
        <div className="flex gap-2 text-xs text-gray-500 mt-1">
          <span className="bg-gray-100 px-2 py-0.5 rounded">
            {expense.category}
          </span>
          <span>{new Date(expense.date).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="font-bold text-lg text-gray-800">{displayAmount}</p>
        <button
          onClick={() => onDelete(expense.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
          title="Delete Expense"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
