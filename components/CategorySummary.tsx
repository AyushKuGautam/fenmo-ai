// /components/CategorySummary.tsx
import { Expense, CATEGORIES } from "@/types/expense";

export default function CategorySummary({ expenses }: { expenses: Expense[] }) {
  const totals = CATEGORIES.map((cat) => {
    const sum = expenses
      .filter((e) => e.category === cat)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return { cat, sum };
  }).filter((item) => item.sum > 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
      {totals.map((item) => (
        <div
          key={item.cat}
          className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm"
        >
          <p className="text-xs text-gray-400 font-bold uppercase">
            {item.cat}
          </p>
          <p className="text-lg font-black text-gray-700">
            {(item.sum / 100).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
