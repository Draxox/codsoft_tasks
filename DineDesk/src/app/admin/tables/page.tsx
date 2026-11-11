"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { QrCode, Plus, Users, MapPin, RefreshCw, Printer, ArrowLeft, Check, AlertCircle } from "lucide-react";

export default function AdminTablesPage() {
  const [tables, setTables] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedTableForQr, setSelectedTableForQr] = useState<any>(null);

  // New table form state
  const [newTableNum, setNewTableNum] = useState<string>("");
  const [newCapacity, setNewCapacity] = useState<string>("4");
  const [newLocation, setNewLocation] = useState<string>("Main Dining Hall");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const fetchTables = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/tables");
      const data = await res.json();
      if (data.tables) {
        setTables(data.tables);
        if (!selectedTableForQr && data.tables.length > 0) {
          setSelectedTableForQr(data.tables[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load tables", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNum) return;
    setIsAdding(true);
    try {
      const res = await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: Number(newTableNum),
          capacity: Number(newCapacity),
          location: newLocation,
        }),
      });
      if (res.ok) {
        setShowAddModal(false);
        setNewTableNum("");
        fetchTables();
      }
    } catch (err) {
      console.error("Failed to create table", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateStatus = async (tableId: string, status: string) => {
    try {
      setTables((prev) =>
        prev.map((t) => (t.id === tableId ? { ...t, status } : t))
      );
      await fetch("/api/tables", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tableId, status }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to Dashboard
              </Link>
              <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">
                Table Floor & QR Code Manager
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                Manage table occupancy and generate printable QR code standees for diners.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                Add New Table
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tables Grid (2 cols on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">
                Restaurant Floor Plan ({tables.length} Tables)
              </h2>
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Vacant
                </span>
                <span className="flex items-center gap-1.5 text-orange-700">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> Occupied
                </span>
                <span className="flex items-center gap-1.5 text-blue-700">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> Reserved
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {tables.map((tbl) => {
                const isSelected = selectedTableForQr?.id === tbl.id;
                return (
                  <div
                    key={tbl.id}
                    onClick={() => setSelectedTableForQr(tbl)}
                    className={`bg-white p-5 rounded-2xl border cursor-pointer transition flex flex-col justify-between gap-4 ${
                      isSelected
                        ? "border-orange-500 ring-2 ring-orange-500/20 shadow-md"
                        : "border-zinc-200 hover:border-zinc-300 shadow-xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-xs font-bold text-zinc-400">TABLE</span>
                          <h3 className="text-2xl font-black text-zinc-900">
                            #{tbl.tableNumber}
                          </h3>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            tbl.status === "VACANT"
                              ? "bg-emerald-100 text-emerald-800"
                              : tbl.status === "OCCUPIED"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {tbl.status}
                        </span>
                      </div>

                      <div className="mt-3 space-y-1 text-xs text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Seats up to {tbl.capacity} guests</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{tbl.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick status toggles */}
                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(tbl.id, "VACANT");
                        }}
                        className={`text-[10px] px-2 py-1 rounded font-bold transition ${
                          tbl.status === "VACANT"
                            ? "bg-emerald-600 text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        Vacant
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(tbl.id, "OCCUPIED");
                        }}
                        className={`text-[10px] px-2 py-1 rounded font-bold transition ${
                          tbl.status === "OCCUPIED"
                            ? "bg-orange-600 text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        Occupied
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateStatus(tbl.id, "RESERVED");
                        }}
                        className={`text-[10px] px-2 py-1 rounded font-bold transition ${
                          tbl.status === "RESERVED"
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                        }`}
                      >
                        Reserved
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QR Code Standee Preview Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl border border-zinc-200/80 p-6 shadow-sm text-center space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                  <QrCode className="w-4 h-4 text-orange-600" />
                  Table Standee Preview
                </div>
                {selectedTableForQr && (
                  <span className="text-xs bg-orange-100 text-orange-800 font-bold px-2.5 py-0.5 rounded-full">
                    Table #{selectedTableForQr.tableNumber}
                  </span>
                )}
              </div>

              {selectedTableForQr ? (
                <div className="space-y-4">
                  {/* Standee Mock Card */}
                  <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 text-white p-6 rounded-2xl shadow-xl space-y-4 border border-zinc-800">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-orange-400">
                        DineDesk Smart Dining
                      </p>
                      <h4 className="text-xl font-black mt-0.5">
                        Table #{selectedTableForQr.tableNumber}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Scan to browse menu & place your order
                      </p>
                    </div>

                    {/* Generated QR Code via free public QR generator */}
                    <div className="bg-white p-4 rounded-xl inline-block shadow-inner">
                      <Image
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          `http://localhost:3000/menu?table=${selectedTableForQr.tableNumber}`
                        )}`}
                        alt={`QR Code Table ${selectedTableForQr.tableNumber}`}
                        width={180}
                        height={180}
                        className="mx-auto"
                        unoptimized
                      />
                    </div>

                    <div className="text-[11px] text-zinc-400 space-y-1">
                      <p className="font-semibold text-zinc-300">No app install required</p>
                      <p className="font-mono text-[10px] text-orange-400">
                        /menu?table={selectedTableForQr.tableNumber}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <a
                      href={`/menu?table=${selectedTableForQr.tableNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                    >
                      Test Guest Experience
                    </a>

                    <button
                      onClick={() => window.print()}
                      className="w-full py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Printer className="w-4 h-4" />
                      Print Table Tent / Standee
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-zinc-400 py-12">
                  Select a table to view its QR code standee.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Table Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <form
            onSubmit={handleAddTable}
            className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-zinc-200 animate-in zoom-in-95 duration-200"
          >
            <h3 className="text-base font-bold text-zinc-900">Add New Dining Table</h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Table Number *</label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g. 9"
                value={newTableNum}
                onChange={(e) => setNewTableNum(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Seating Capacity</label>
              <input
                type="number"
                min="1"
                max="20"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Section Location</label>
              <select
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Main Dining Hall">Main Dining Hall</option>
                <option value="Patio Terrace">Patio Terrace</option>
                <option value="Window View">Window View</option>
                <option value="Private Dining Suite">Private Dining Suite</option>
                <option value="Bar High-Tops">Bar High-Tops</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isAdding}
                className="px-4 py-2 text-xs font-bold bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
              >
                {isAdding ? "Adding..." : "Create Table"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

