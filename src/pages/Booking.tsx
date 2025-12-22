import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowLeftRight, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusCard, { PickupData } from "@/components/booking/BusCard";
import CheckoutSummary from "@/components/booking/CheckoutSummary";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { buses, Bus as BusType } from "@/data/mockData";
import { cn } from "@/lib/utils";

const cities = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Semarang",
  "Yogyakarta",
  "Solo",
  "Malang",
  "Cirebon",
];

const Booking = () => {
  const [from, setFrom] = useState("Jakarta");
  const [to, setTo] = useState("Surabaya");
  const [date, setDate] = useState<Date>(new Date());
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusType | null>(null);
  const [pickupData, setPickupData] = useState<PickupData | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleBook = (bus: BusType, data: PickupData) => {
    setSelectedBus(bus);
    setPickupData(data);
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    setSelectedBus(null);
    setPickupData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl shadow-elevated p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* From */}
              <div className="md:col-span-3 relative">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Dari</label>
                <Select value={from} onValueChange={setFrom}>
                  <SelectTrigger className="h-12 bg-secondary border-0 rounded-xl pl-10">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <button
                  onClick={handleSwap}
                  className="w-10 h-10 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowLeftRight className="w-5 h-5 text-primary" />
                </button>
              </div>

              {/* To */}
              <div className="md:col-span-3 relative">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ke</label>
                <Select value={to} onValueChange={setTo}>
                  <SelectTrigger className="h-12 bg-secondary border-0 rounded-xl pl-10">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.filter((c) => c !== from).map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date */}
              <div className="md:col-span-3 relative">
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tanggal</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className={cn(
                        "w-full h-12 bg-secondary rounded-xl pl-10 pr-3 text-left text-sm font-medium flex items-center",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="absolute left-3 w-5 h-5 text-primary" />
                      {date ? format(date, "EEEE, d MMMM yyyy", { locale: id }) : "Pilih tanggal"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                      disabled={(d) => d < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button onClick={handleSearch} variant="search" size="xl" className="w-full h-12">
                  <Search className="w-5 h-5 mr-2" />
                  Cari
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
            >
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {from} → {to}
                </h1>
                <p className="text-muted-foreground">
                  {format(date, "EEEE, d MMMM yyyy", { locale: id })} • {buses.length} bus tersedia
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter & Urutkan
              </Button>
            </motion.div>

            {/* Bus List */}
            <div className="space-y-4">
              {buses.map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BusCard bus={bus} onBook={handleBook} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {!hasSearched && (
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                🚌
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Cari Bus Anda</h2>
              <p className="text-muted-foreground">
                Pilih kota asal, tujuan, dan tanggal keberangkatan untuk melihat jadwal bus yang tersedia
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />

      {/* Checkout Modal */}
      {showCheckout && selectedBus && pickupData && (
        <CheckoutSummary
          bus={selectedBus}
          pickupData={pickupData}
          date={format(date, "d MMMM yyyy", { locale: id })}
          onClose={handleCloseCheckout}
        />
      )}
    </div>
  );
};

export default Booking;
