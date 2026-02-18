// /app/api/expenses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { addExpense, getExpenses } from "@/lib/store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let expenses = getExpenses();

  if (category && category !== "All") {
    expenses = expenses.filter((e) => e.category === category);
  }

  if (sort === "date_desc") {
    expenses = [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const newExpense = addExpense(body);

  if (!newExpense) {
    return NextResponse.json(
      { error: "Duplicate submission" },
      { status: 409 },
    );
  }
  return NextResponse.json(newExpense, { status: 201 });
}
