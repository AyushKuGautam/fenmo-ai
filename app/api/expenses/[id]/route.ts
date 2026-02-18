// /app/api/expenses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteExpense } from "@/lib/store";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }, // 1. Define params as a Promise
) {
  try {
    const resolvedParams = await params; // 2. Await the params to get the actual ID
    const id = resolvedParams.id;

    const success = deleteExpense(id);

    if (!success) {
      // If the item doesn't exist (e.g., after a page refresh of the in-memory store)
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
