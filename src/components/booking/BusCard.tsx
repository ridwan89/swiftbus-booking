import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Clock, MapPin, Wifi, Wind, Armchair, ChevronDown, ChevronUp, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Bus as BusType, formatPrice, popularLocations, pickDropPrices } from "@/data/mockData";

interface BusCardProps {
  bus: BusType;
  onBook: (bus: BusType, pickupData: PickupData) => void;
}

export interface PickupData {
  pickupEnabled: boolean;
  dropoffEnabled: boolean;
  pickupLocation: string;
  dropoffLocation: string;
  pickupPrice: number;
  dropoffPrice: number;
}

const BusCard = ({ bus, onBook }: BusCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pickupEnabled, setPickupEnabled] = useState(false);
  const [dropoffEnabled, setDropoffEnabled] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [customPickup, setCustomPickup] = useState("");
  const [customDropoff, setCustomDropoff] = useState("");

  const pickupPrice = pickupEnabled ? pickDropPrices.medium : 0;
  const dropoffPrice = dropoffEnabled ? pickDropPrices.medium : 0;
  const totalPrice = bus.price + pickupPrice + dropoffPrice;

  // Simulasi buffer time 1 jam sebelum berangkat
  const getPickupTime = () => {
    const [hours, minutes] = bus.departureTime.split(':').map(Number);
    const pickupHours = hours - 1;
    return `${String(pickupHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };

  const handleBook = () => {
    onBook(bus, {
      pickupEnabled,
      dropoffEnabled,
      pickupLocation: pickupLocation === 'Rumah (Input Alamat)' ? customPickup : pickupLocation,
      dropoffLocation: dropoffLocation === 'Rumah (Input Alamat)' ? customDropoff : dropoffLocation,
      pickupPrice,
      dropoffPrice,
    });
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'AC': <Wind className="w-4 h-4" />,
    'WiFi': <Wifi className="w-4 h-4" />,
    'Toilet': <span className="text-xs">🚽</span>,
    'Selimut': <span className="text-xs">🛏️</span>,
    'Bantal': <span className="text-xs">🛋️</span>,
    'Snack': <span className="text-xs">🍿</span>,
    'Charger': <span className="text-xs">🔌</span>,
    'TV': <span className="text-xs">📺</span>,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl shadow-elevated overflow-hidden border border-border/50"
    >
      {/* Main Card */}
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Operator Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
              {bus.logo}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{bus.operator}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {bus.class}
                </span>
                <span className="flex items-center gap-1">
                  <Armchair className="w-3.5 h-3.5" />
                  {bus.seatsAvailable} kursi tersedia
                </span>
              </div>
            </div>
          </div>

          {/* Time & Duration */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="font-bold text-xl text-foreground">{bus.departureTime}</p>
              <p className="text-xs text-muted-foreground">{bus.from}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
                <Bus className="w-4 h-4 text-accent" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-accent to-primary" />
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {bus.duration}
              </p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl text-foreground">{bus.arrivalTime}</p>
              <p className="text-xs text-muted-foreground">{bus.to}</p>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-2xl font-bold text-primary">{formatPrice(bus.price)}</p>
            <p className="text-xs text-muted-foreground">/orang</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {bus.amenities.map((amenity) => (
            <span
              key={amenity}
              className="flex items-center gap-1 px-2 py-1 bg-secondary rounded-lg text-xs text-muted-foreground"
            >
              {amenityIcons[amenity]}
              {amenity}
            </span>
          ))}
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 pt-4 border-t border-border flex items-center justify-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <Bike className="w-4 h-4" />
          {isExpanded ? 'Sembunyikan' : 'Tambah Penjemputan/Pengantaran'}
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Section - Pick & Drop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-6 space-y-4 bg-secondary/30">
              {/* Pickup Section */}
              <div className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <Label className="font-semibold text-foreground">Penjemputan</Label>
                      <p className="text-xs text-muted-foreground">Driver ojol menjemput di lokasi Anda</p>
                    </div>
                  </div>
                  <Switch checked={pickupEnabled} onCheckedChange={setPickupEnabled} />
                </div>

                {pickupEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 mt-4"
                  >
                    <Select value={pickupLocation} onValueChange={setPickupLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih lokasi penjemputan" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularLocations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {pickupLocation === 'Rumah (Input Alamat)' && (
                      <Input
                        placeholder="Masukkan alamat lengkap penjemputan..."
                        value={customPickup}
                        onChange={(e) => setCustomPickup(e.target.value)}
                      />
                    )}

                    <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gojek_logo_2019.svg/120px-Gojek_logo_2019.svg.png" alt="Gojek" className="h-5 object-contain" />
                        <span className="text-xs text-muted-foreground">via Gojek/Grab</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{formatPrice(pickDropPrices.medium)}</p>
                        <p className="text-xs text-muted-foreground">Jemput pukul {getPickupTime()}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Dropoff Section */}
              <div className="p-4 bg-card rounded-xl border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <Label className="font-semibold text-foreground">Pengantaran</Label>
                      <p className="text-xs text-muted-foreground">Driver ojol mengantar ke tujuan akhir</p>
                    </div>
                  </div>
                  <Switch checked={dropoffEnabled} onCheckedChange={setDropoffEnabled} />
                </div>

                {dropoffEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 mt-4"
                  >
                    <Select value={dropoffLocation} onValueChange={setDropoffLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih lokasi pengantaran" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularLocations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {dropoffLocation === 'Rumah (Input Alamat)' && (
                      <Input
                        placeholder="Masukkan alamat lengkap tujuan akhir..."
                        value={customDropoff}
                        onChange={(e) => setCustomDropoff(e.target.value)}
                      />
                    )}

                    <div className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Grab_Logo.svg/120px-Grab_Logo.svg.png" alt="Grab" className="h-5 object-contain" />
                        <span className="text-xs text-muted-foreground">via Gojek/Grab</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-accent">{formatPrice(pickDropPrices.medium)}</p>
                        <p className="text-xs text-muted-foreground">Estimasi tersedia</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Total Summary */}
              <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tiket Bus</span>
                    <span className="font-medium">{formatPrice(bus.price)}</span>
                  </div>
                  {pickupEnabled && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Penjemputan</span>
                      <span className="font-medium text-green-600">+{formatPrice(pickupPrice)}</span>
                    </div>
                  )}
                  {dropoffEnabled && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pengantaran</span>
                      <span className="font-medium text-accent">+{formatPrice(dropoffPrice)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-border flex justify-between">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-xl text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <Button onClick={handleBook} className="w-full mt-4" variant="search" size="lg">
                  Lanjutkan Pemesanan
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BusCard;
