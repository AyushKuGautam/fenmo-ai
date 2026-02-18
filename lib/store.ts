// /lib/store.ts
import { Expense } from "@/types/expense";

let expenses: Expense[] = [];

//Returns the current list of expenses.

export const getExpenses = () => expenses;

export const addExpense = (
  expense: Omit<Expense, "id" | "created_at">,
): Expense | null => {
  const now = new Date();

  const isDuplicate = expenses.some(
    (e) =>
      e.amount === expense.amount &&
      e.description === expense.description &&
      e.category === expense.category &&
      e.date === expense.date &&
      now.getTime() - new Date(e.created_at).getTime() < 10000,
  );

  if (isDuplicate) return null;

  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(), // Generates unique ID as required.
    created_at: now.toISOString(), // Adds metadata for tracking.
  };

  expenses.push(newExpense);
  return newExpense;
};

// Removes an expense by ID.
 
export const deleteExpense = (id: string): boolean => {
  const initialLength = expenses.length;
  expenses = expenses.filter((e) => e.id !== id);
  return expenses.length < initialLength;
};
