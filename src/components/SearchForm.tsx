import { useState } from "react";
import { MapPin, Calendar, Users, ArrowRight, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  "Bekasi",
  "Tangerang",
  "Depok",
  "Bogor",
  "Tasikmalaya",
  "Purwokerto",
  "Madiun",
  "Kediri",
  "Tegal",
  "Pekalongan",
];

const SearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>();
  const [passengers, setPassengers] = useState("1");

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-card rounded-2xl shadow-elevated p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-end">
        {/* From */}
        <div className="md:col-span-3 relative">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Dari</label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="h-12 md:h-14 bg-secondary border-0 rounded-xl pl-10">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <SelectValue placeholder="Pilih kota" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap Button */}
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
            <SelectTrigger className="h-12 md:h-14 bg-secondary border-0 rounded-xl pl-10">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-accent" />
              <SelectValue placeholder="Pilih kota" />
            </SelectTrigger>
            <SelectContent>
              {cities.filter((c) => c !== from).map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="md:col-span-2 relative">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Tanggal</label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "w-full h-12 md:h-14 bg-secondary rounded-xl pl-10 pr-3 text-left text-sm font-medium flex items-center",
                  !date && "text-muted-foreground"
                )}
              >
                <Calendar className="absolute left-3 w-5 h-5 text-primary" />
                {date ? format(date, "EEE, d MMM", { locale: id }) : "Pilih tanggal"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Passengers */}
        <div className="md:col-span-1 relative">
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Penumpang</label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className="h-12 md:h-14 bg-secondary border-0 rounded-xl pl-10">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <Button variant="search" size="xl" className="w-full h-12 md:h-14">
            Cari Bus
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
