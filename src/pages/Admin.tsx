import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Bus, CheckCircle, Clock, AlertCircle, Phone, MapPin, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { passengers, Passenger } from "@/data/mockData";

const statusConfig = {
  not_applicable: { label: "Tidak Pakai", color: "bg-muted text-muted-foreground", icon: null },
  pending: { label: "Menunggu Driver", color: "bg-yellow-500/10 text-yellow-600", icon: Clock },
  driver_assigned: { label: "Driver Ditugaskan", color: "bg-blue-500/10 text-blue-600", icon: Users },
  picked_up: { label: "Sudah Dijemput", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  delivered_to_pool: { label: "Tiba di Pool", color: "bg-primary/10 text-primary", icon: CheckCircle },
};

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredPassengers = passengers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);
    const matchesFilter = filterStatus === "all" || p.pickupStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: passengers.length,
    withPickup: passengers.filter(p => p.pickupEnabled).length,
    pickedUp: passengers.filter(p => p.pickupStatus === "picked_up" || p.pickupStatus === "delivered_to_pool").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manifest Penumpang - PO 27Trans (06:00 Jakarta → Surabaya)</p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Penumpang</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.withPickup}</p>
                  <p className="text-xs text-muted-foreground">Pakai Pick & Drop</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pickedUp}</p>
                  <p className="text-xs text-muted-foreground">Sudah Dijemput</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-card rounded-xl p-4 mb-6 border border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Cari nama atau nomor telepon..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Kursi</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Penumpang</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Telepon</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Lokasi Jemput</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status Penjemputan</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Driver</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPassengers.map((passenger, index) => {
                    const status = statusConfig[passenger.pickupStatus];
                    return (
                      <motion.tr key={passenger.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="border-t border-border hover:bg-secondary/30">
                        <td className="p-4 font-mono font-bold text-primary">{passenger.seatNumber}</td>
                        <td className="p-4 font-medium text-foreground">{passenger.name}</td>
                        <td className="p-4 text-muted-foreground">{passenger.phone}</td>
                        <td className="p-4 text-sm text-muted-foreground max-w-[200px] truncate">{passenger.pickupLocation || "-"}</td>
                        <td className="p-4">
                          <Badge className={status.color}>{status.label}</Badge>
                        </td>
                        <td className="p-4">
                          {passenger.driverName ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-foreground">{passenger.driverName}</span>
                              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                                <Phone className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
