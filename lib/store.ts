import { Expense } from "@/types/expense";

let expenses: Expense[] = [];

export const getExpenses = () => expenses;

export const addExpense = (
  expense: Omit<Expense, "id" | "created_at">,
): Expense | null => {
  const now = new Date();
  // Idempotency: prevent double-clicks/retries within 10 seconds
  const isDuplicate = expenses.some(
    (e) =>
      e.amount === expense.amount &&
      e.description === expense.description &&
      now.getTime() - new Date(e.created_at).getTime() < 10000,
  );

  if (isDuplicate) return null;

  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    created_at: now.toISOString(),
  };
  expenses.push(newExpense);
  return newExpense;
};
