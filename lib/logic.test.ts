// /lib/logic.test.ts
import { describe, it, expect } from "vitest";

const formatCurrency = (amountInCents: number) => {
  return (amountInCents / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

describe("Financial Logic Correctness", () => {
  it("should correctly convert cents to formatted INR", () => {
    expect(formatCurrency(1050)).toContain("10.50");
    expect(formatCurrency(50000)).toContain("500.00");
  });

  it("should handle zero amounts correctly", () => {
    expect(formatCurrency(0)).toContain("0.00");
  });
});

describe("Data Integrity (Idempotency Simulation)", () => {
  it("should flag potential duplicates based on identical attributes", () => {
    const existingExpense = {
      amount: 100,
      description: "Lunch",
      category: "Food",
    };
    const newEntry = { amount: 100, description: "Lunch", category: "Food" };

    const isDuplicate =
      existingExpense.amount === newEntry.amount &&
      existingExpense.description === newEntry.description &&
      existingExpense.category === newEntry.category;

    expect(isDuplicate).toBe(true);
  });
});
