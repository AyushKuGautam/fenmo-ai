// /lib/store.ts
import { Expense } from "@/types/expense";

const globalStore = global as unknown as { expenses: Expense[] };
if (!globalStore.expenses) {
  globalStore.expenses = [];
}

export const getExpenses = () => globalStore.expenses;

export const addExpense = (
  expense: Omit<Expense, "id" | "created_at">,
): Expense | null => {
  const now = new Date();

  // Idempotency check 
  const isDuplicate = globalStore.expenses.some(
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

  globalStore.expenses.push(newExpense);
  return newExpense;
};

export const deleteExpense = (id: string): boolean => {
  const initialLength = globalStore.expenses.length;
  globalStore.expenses = globalStore.expenses.filter((e) => e.id !== id);
  return globalStore.expenses.length < initialLength;
};
