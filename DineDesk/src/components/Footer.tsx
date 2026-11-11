import React from "react";
import Link from "next/link";
import { Utensils, Heart, Clock, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 mt-20 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold">DineDesk</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Modern digital dining, real-time kitchen operations, and frictionless table management built for fast-paced culinary teams.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/menu" className="hover:text-white transition">Explore Digital Menu</Link></li>
              <li><Link href="/reservations" className="hover:text-white transition">Reserve a Table</Link></li>
              <li><Link href="/kitchen" className="hover:text-white transition">Live Kitchen Board (KDS)</Link></li>
              <li><Link href="/admin" className="hover:text-white transition">Manager Dashboard</Link></li>
            </ul>
          </div>

          {/* Operating hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Operating Hours</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Mon – Fri: 11:00 AM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span>Sat – Sun: 10:00 AM – Midnight</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Kitchen closes 45 min before closing time.</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Visit Us</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>42 Gourmet Boulevard, Culinary Quarter, Tech City</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-500" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-zinc-800 text-center text-xs text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} DineDesk Restaurant Platform. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for CodSoft Full Stack Internship
          </span>
        </div>
      </div>
    </footer>
  );
}

