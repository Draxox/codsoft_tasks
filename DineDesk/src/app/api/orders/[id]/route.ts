import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ordersStore, tablesStore } from "@/lib/orders-store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: id }, { orderNumber: id }],
      },
      include: {
        table: true,
        items: {
          include: { menuItem: true },
        },
      },
    });

    if (order) {
      return NextResponse.json({ success: true, order });
    }
  } catch (error) {
    // Database fallback
  }

  // Look up in the shared global ordersStore
  const foundOrder = ordersStore.findOrder(id);

  if (foundOrder) {
    return NextResponse.json({ success: true, order: foundOrder });
  }

  return NextResponse.json({ error: "Order not found" }, { status: 404 });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status, paymentStatus, paymentMethod } = body;

    try {
      const updatedOrder = await prisma.order.update({
        where: { id: id },
        data: {
          ...(status ? { status } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
          ...(paymentMethod ? { paymentMethod } : {}),
        },
        include: {
          table: true,
          items: {
            include: { menuItem: true },
          },
        },
      });

      // If order is completed or cancelled and has a table, release table back to VACANT
      if ((status === "COMPLETED" || status === "CANCELLED") && updatedOrder.tableId) {
        await prisma.table.update({
          where: { id: updatedOrder.tableId },
          data: { status: "VACANT" },
        });
      }

      return NextResponse.json({ success: true, order: updatedOrder });
    } catch (dbErr) {
      // Update in the shared global ordersStore
      const updatedMock = ordersStore.updateOrder(id, {
        ...(status ? { status } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
        ...(paymentMethod ? { paymentMethod } : {}),
      });

      if (updatedMock) {
        if ((status === "COMPLETED" || status === "CANCELLED") && updatedMock.tableNumber) {
          tablesStore.updateTableStatus(updatedMock.tableNumber, "VACANT");
        }
        return NextResponse.json({ success: true, order: updatedMock });
      }

      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update order" }, { status: 500 });
  }
}
