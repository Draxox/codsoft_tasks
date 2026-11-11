import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory fallback reservations store
let mockReservations: any[] = [
  {
    id: "res-101",
    guestName: "Vikram Malhotra",
    guestEmail: "vikram@example.com",
    guestPhone: "9876543210",
    partySize: 4,
    reservationDate: new Date().toISOString().split("T")[0],
    timeSlot: "20:00",
    tableId: "tbl-5",
    tableNumber: 5,
    specialRequests: "Window seat preferred, birthday dinner",
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" },
      include: { table: true },
    });
    return NextResponse.json({ success: true, reservations });
  } catch (error) {
    return NextResponse.json({ success: true, reservations: mockReservations });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { guestName, guestEmail, guestPhone, partySize, reservationDate, timeSlot, specialRequests, preferredLocation } = body;

    if (!guestName || !guestPhone || !reservationDate || !timeSlot || !partySize) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Phone, Date, Time, and Party Size)." },
        { status: 400 }
      );
    }

    try {
      // Find a matching vacant table
      const availableTable = await prisma.table.findFirst({
        where: {
          capacity: { gte: Number(partySize) },
          status: "VACANT",
        },
      });

      const newReservation = await prisma.reservation.create({
        data: {
          guestName,
          guestEmail: guestEmail || "",
          guestPhone,
          partySize: Number(partySize),
          reservationDate: new Date(reservationDate),
          timeSlot,
          specialRequests: specialRequests || "",
          status: "CONFIRMED",
          tableId: availableTable ? availableTable.id : null,
        },
        include: { table: true },
      });

      if (availableTable) {
        await prisma.table.update({
          where: { id: availableTable.id },
          data: { status: "RESERVED" },
        });
      }

      return NextResponse.json({ success: true, reservation: newReservation }, { status: 201 });
    } catch (dbErr) {
      // Fallback
      const newMock = {
        id: "res-" + Math.floor(1000 + Math.random() * 9000),
        guestName,
        guestEmail,
        guestPhone,
        partySize: Number(partySize),
        reservationDate,
        timeSlot,
        specialRequests,
        status: "CONFIRMED",
        tableNumber: partySize <= 2 ? 1 : partySize <= 4 ? 2 : 6,
        createdAt: new Date().toISOString(),
      };
      mockReservations.unshift(newMock);
      return NextResponse.json({ success: true, reservation: newMock }, { status: 201 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create reservation" }, { status: 500 });
  }
}

