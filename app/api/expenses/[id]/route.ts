// /app/api/expenses/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { deleteExpense } from "@/lib/store";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    console.log("SERVER LOG: Attempting to delete ID:", id); // Check your terminal for this!

    if (!id) {
      return NextResponse.json({ error: "No ID provided" }, { status: 400 });
    }

    const success = deleteExpense(id);

    if (!success) {
      console.log("SERVER LOG: Delete failed. ID not found in store.");
      return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    console.log("SERVER LOG: Delete successful!");
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
