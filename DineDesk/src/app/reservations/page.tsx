"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Users, MapPin, CheckCircle2, Sparkles, ArrowRight, Loader2, Utensils } from "lucide-react";

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM",
  "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM"
];

const SEATING_AREAS = [
  { id: "main", name: "Main Dining Hall", desc: "Vibrant ambient atmosphere with warm lighting" },
  { id: "window", name: "Window View", desc: "Picturesque city street views, perfect for couples" },
  { id: "patio", name: "Patio Terrace", desc: "Open-air alfresco dining with gentle evening breeze" },
  { id: "private", name: "Private Dining Suite", desc: "Exclusive quiet setting for gatherings (6+ guests)" },
];

export default function ReservationsPage() {
  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>("07:30 PM");
  const [selectedArea, setSelectedArea] = useState<string>("main");

  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!guestName.trim() || !guestPhone.trim() || !date || !selectedSlot) {
      setErrorMsg("Please provide your Name, Phone Number, Date, and Time Slot.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          guestEmail,
          guestPhone,
          partySize,
          reservationDate: date,
          timeSlot: selectedSlot,
          specialRequests: `Preferred Area: ${selectedArea}. ${specialRequests}`.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to book table.");
      }

      setConfirmedBooking(data.reservation);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <CalendarDays className="w-3.5 h-3.5 text-orange-600" />
            Table Reservations
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
            Reserve Your Culinary Experience
          </h1>
          <p className="text-sm text-zinc-500 max-w-lg mx-auto">
            Skip the waiting queue. Reserve a table in advance for intimate dinners, business lunches, or family celebrations.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success Card */
          <div className="bg-white rounded-3xl border border-zinc-200 p-8 sm:p-12 shadow-sm text-center max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-zinc-900">Table Confirmed!</h2>
              <p className="text-xs text-zinc-500">
                Reservation Reference: <strong className="text-zinc-800">#{confirmedBooking.id?.slice(-6).toUpperCase()}</strong>
              </p>
            </div>

            {/* Details Box */}
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5 text-left text-xs space-y-3">
              <div className="flex justify-between py-1 border-b border-zinc-200">
                <span className="text-zinc-500">Guest Name</span>
                <span className="font-bold text-zinc-900">{confirmedBooking.guestName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200">
                <span className="text-zinc-500">Party Size</span>
                <span className="font-bold text-zinc-900">{confirmedBooking.partySize} Guests</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-200">
                <span className="text-zinc-500">Date & Time</span>
                <span className="font-bold text-orange-600">
                  {confirmedBooking.reservationDate?.slice(0, 10)} at {confirmedBooking.timeSlot}
                </span>
              </div>
              {confirmedBooking.tableNumber && (
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Assigned Table</span>
                  <span className="font-bold text-zinc-900">Table #{confirmedBooking.tableNumber}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-zinc-500">
              A confirmation SMS has been dispatched to <strong>{confirmedBooking.guestPhone}</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Utensils className="w-4 h-4" />
                Pre-Select Dishes on Menu
              </Link>
              <button
                onClick={() => setConfirmedBooking(null)}
                className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-10 shadow-sm space-y-8">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* Step 1: Party Size */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
                <Users className="w-4 h-4 text-orange-600" />
                Select Party Size (Guests)
              </label>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPartySize(num)}
                    className={`w-12 h-12 rounded-xl text-sm font-bold transition flex items-center justify-center ${
                      partySize === num
                        ? "bg-orange-600 text-white shadow-md shadow-orange-500/20"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
                  <CalendarDays className="w-4 h-4 text-orange-600" />
                  Reservation Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
                  <Clock className="w-4 h-4 text-orange-600" />
                  Select Time Slot
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Seating Preference */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
                <MapPin className="w-4 h-4 text-orange-600" />
                Preferred Seating Area
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEATING_AREAS.map((area) => (
                  <div
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                      selectedArea === area.id
                        ? "border-orange-500 bg-orange-50/50 shadow-xs"
                        : "border-zinc-200 bg-white hover:bg-zinc-50"
                    }`}
                  >
                    <p className="text-xs font-bold text-zinc-900">{area.name}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Guest Contact Details */}
            <div className="pt-4 border-t border-zinc-200 space-y-4">
              <h3 className="text-sm font-bold text-zinc-900">Guest Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Watson"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 9876543210"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. john@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">Special Occasion / Request</label>
                  <input
                    type="text"
                    placeholder="e.g. Anniversary dinner, quiet corner"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reserving Table...
                </>
              ) : (
                <>
                  Confirm Table Reservation
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

