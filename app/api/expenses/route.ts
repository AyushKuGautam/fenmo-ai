// /app/api/expenses/route.ts
import { NextRequest, NextResponse } from "next/server";
import { addExpense, getExpenses } from "@/lib/store";


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  let expenses = getExpenses();

  // Filter by category if provided and not "All" 
  if (category && category !== "All") {
    expenses = expenses.filter((e) => e.category === category);
  }

  // Sort by date (newest first) if requested 
  if (sort === "date_desc") {
    expenses = [...expenses].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  return NextResponse.json(expenses);
}

export async function POST(request: NextRequest) {
  // Simulate real-world network latency 
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const body = await request.json();

    // Ensures system correctness even if frontend validation is bypassed 
    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { error: "Valid positive amount required" },
        { status: 400 },
      );
    }
    if (!body.description || body.description.trim().length < 3) {
      return NextResponse.json(
        { error: "Description must be at least 3 characters long" },
        { status: 400 },
      );
    }
    if (!body.category || !body.date) {
      return NextResponse.json(
        { error: "Missing required fields (category/date)" },
        { status: 400 },
      );
    }

    //Idempotency Check ---
    // addExpense handles the 10-second duplicate check logic 
    const newExpense = addExpense(body);

    if (!newExpense) {
      return NextResponse.json(
        {
          error:
            "Duplicate submission detected. Please wait a few seconds before retrying.",
        },
        { status: 409 }, // Conflict status code for duplicates
      );
    }

    return NextResponse.json(newExpense, { status: 201 });
  } catch (e) { 
    return NextResponse.json(
      { error: "Malformed request body" },
      { status: 400 },
    );
  }
}
