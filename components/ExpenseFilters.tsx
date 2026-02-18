// /components/ExpenseFilters.tsx
import { CATEGORIES } from "@/types/expense";

interface Props {
  onFilterChange: (cat: string) => void;
  onSortChange: (sort: string) => void;
}

export default function ExpenseFilters({
  onFilterChange,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center justify-between bg-gray-50 p-4 rounded-lg border">
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-600">Filter:</label>
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          className="p-1.5 border rounded bg-white text-sm"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-600">Sort:</label>
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="p-1.5 border rounded bg-white text-sm"
        >
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
