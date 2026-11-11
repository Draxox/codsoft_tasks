import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tablesStore } from "@/lib/orders-store";

export async function GET() {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { tableNumber: "asc" },
      include: {
        orders: {
          where: { status: { notIn: ["COMPLETED", "CANCELLED"] } },
        },
      },
    });

    if (tables && tables.length > 0) {
      return NextResponse.json({ success: true, tables });
    }
  } catch (error) {
    // Database fallback
  }

  return NextResponse.json({ success: true, tables: tablesStore.getTables() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tableNumber, capacity, location } = body;

    if (!tableNumber) {
      return NextResponse.json({ error: "Table number is required" }, { status: 400 });
    }

    try {
      const newTable = await prisma.table.create({
        data: {
          tableNumber: Number(tableNumber),
          capacity: Number(capacity) || 4,
          location: location || "Main Dining Hall",
          status: "VACANT",
        },
      });
      return NextResponse.json({ success: true, table: newTable }, { status: 201 });
    } catch (dbErr) {
      const newMockTable = tablesStore.addTable({
        id: "tbl-" + Date.now(),
        tableNumber: Number(tableNumber),
        capacity: Number(capacity) || 4,
        location: location || "Main Dining Hall",
        status: "VACANT",
      });
      return NextResponse.json({ success: true, table: newMockTable }, { status: 201 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create table" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { tableId, status } = body;

    try {
      const updated = await prisma.table.update({
        where: { id: tableId },
        data: { status },
      });
      return NextResponse.json({ success: true, table: updated });
    } catch (dbErr) {
      const updatedMock = tablesStore.updateTableStatus(tableId, status);
      if (updatedMock) {
        return NextResponse.json({ success: true, table: updatedMock });
      }
      return NextResponse.json({ error: "Table not found" }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update table" }, { status: 500 });
  }
}
