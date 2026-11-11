import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ordersStore, tablesStore } from "@/lib/orders-store";
import { initialMenuItems, MockOrder } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  try {
    const orders = await prisma.order.findMany({
      where: status ? { status: status as any } : undefined,
      include: {
        table: true,
        items: {
          include: { menuItem: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (orders && orders.length > 0) {
      return NextResponse.json({ success: true, source: "database", orders });
    }
  } catch (error) {
    // Database fallback
  }

  let orders = ordersStore.getOrders();
  if (status) {
    orders = orders.filter((o) => o.status === status);
  }

  return NextResponse.json({ success: true, source: "memory-store", orders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, orderType, tableNumber, items, notes } = body;

    if (!customerName || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order. Please include customer name and items." },
        { status: 400 }
      );
    }

    const orderNumber = `DD-${Math.floor(1000 + Math.random() * 9000)}`;
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.unitPrice * item.quantity,
      0
    );
    const tax = Math.round(subtotal * 0.05);
    const grandTotal = subtotal + tax;

    try {
      // Find table if dine-in
      let tableRecord = null;
      if (orderType === "DINE_IN" && tableNumber) {
        tableRecord = await prisma.table.findUnique({
          where: { tableNumber: Number(tableNumber) },
        });

        if (tableRecord) {
          await prisma.table.update({
            where: { id: tableRecord.id },
            data: { status: "OCCUPIED" },
          });
        }
      }

      const createdOrder = await prisma.order.create({
        data: {
          orderNumber,
          orderType: orderType || "DINE_IN",
          tableId: tableRecord?.id || null,
          customerName,
          customerPhone: customerPhone || "",
          notes: notes || "",
          status: "PENDING",
          totalAmount: grandTotal,
          paymentStatus: "PENDING",
          paymentMethod: "CARD",
          items: {
            create: items.map((item: any) => ({
              menuItemId: item.menuItemId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              notes: item.notes || "",
            })),
          },
        },
        include: {
          table: true,
          items: {
            include: { menuItem: true },
          },
        },
      });

      return NextResponse.json({ success: true, order: createdOrder }, { status: 201 });
    } catch (dbErr) {
      // In-memory persistent store fallback
      if (orderType === "DINE_IN" && tableNumber) {
        tablesStore.updateTableStatus(tableNumber, "OCCUPIED");
      }

      const newMockOrder: MockOrder = {
        id: "ord-" + Date.now(),
        orderNumber,
        orderType: orderType || "DINE_IN",
        tableNumber: tableNumber ? Number(tableNumber) : undefined,
        customerName,
        customerPhone,
        notes,
        status: "PENDING",
        totalAmount: grandTotal,
        paymentStatus: "PENDING",
        paymentMethod: "UPI",
        items: items.map((i: any, idx: number) => {
          const menuItem = initialMenuItems.find((m) => m.id === i.menuItemId);
          return {
            id: "oi-" + Date.now() + "-" + idx,
            menuItemId: i.menuItemId,
            name: i.name || menuItem?.name || "Specialty Dish",
            quantity: i.quantity,
            unitPrice: i.unitPrice,
            notes: i.notes || "",
          };
        }),
        createdAt: new Date().toISOString(),
      };

      ordersStore.addOrder(newMockOrder);
      return NextResponse.json({ success: true, order: newMockOrder }, { status: 201 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}
