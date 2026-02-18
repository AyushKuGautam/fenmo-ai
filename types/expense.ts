export type Expense = {
  id: string;
  amount: number; // Store as cents (integer) for "real money" precision
  category: string;
  description: string;
  date: string; // YYYY-MM-DD
  created_at: string;
};

export const CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];
