import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, Clock, MapPin, Wifi, Wind, Armchair, ChevronDown, ChevronUp, Car, Bike, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bus as BusType, formatPrice, pickDropPrices } from "@/data/mockData";
import MapPicker from "./MapPicker";

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
  pickupVehicle: "motor" | "car";
  dropoffVehicle: "motor" | "car";
  pickupProvider: "gojek" | "grab";
  dropoffProvider: "gojek" | "grab";
}

// Provider logos
const providerLogos = {
  gojek: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Gojek_logo_2019.svg/120px-Gojek_logo_2019.svg.png",
  grab: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Grab_Logo.svg/120px-Grab_Logo.svg.png",
};

// Vehicle price multiplier
const vehiclePrices = {
  motor: 1,
  car: 1.8,
};

const BusCard = ({ bus, onBook }: BusCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pickupEnabled, setPickupEnabled] = useState(false);
  const [dropoffEnabled, setDropoffEnabled] = useState(false);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupVehicle, setPickupVehicle] = useState<"motor" | "car">("motor");
  const [dropoffVehicle, setDropoffVehicle] = useState<"motor" | "car">("motor");
  const [pickupProvider, setPickupProvider] = useState<"gojek" | "grab">("gojek");
  const [dropoffProvider, setDropoffProvider] = useState<"gojek" | "grab">("grab");
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDropoffMap, setShowDropoffMap] = useState(false);

  const pickupPrice = pickupEnabled ? Math.round(pickDropPrices.medium * vehiclePrices[pickupVehicle]) : 0;
  const dropoffPrice = dropoffEnabled ? Math.round(pickDropPrices.medium * vehiclePrices[dropoffVehicle]) : 0;
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
      pickupLocation,
      dropoffLocation,
      pickupPrice,
      dropoffPrice,
      pickupVehicle,
      dropoffVehicle,
      pickupProvider,
      dropoffProvider,
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

  const ProviderSelector = ({ 
    selected, 
    onSelect, 
    type 
  }: { 
    selected: "gojek" | "grab"; 
    onSelect: (v: "gojek" | "grab") => void;
    type: "pickup" | "dropoff";
  }) => (
    <div className="flex gap-2">
      {(["gojek", "grab"] as const).map((provider) => (
        <button
          key={provider}
          onClick={() => onSelect(provider)}
          className={`flex-1 p-3 rounded-xl border-2 transition-all ${
            selected === provider
              ? type === "pickup" 
                ? "border-green-500 bg-green-500/10" 
                : "border-accent bg-accent/10"
              : "border-border hover:border-primary/30"
          }`}
        >
          <img
            src={providerLogos[provider]}
            alt={provider}
            className="h-6 mx-auto object-contain"
          />
        </button>
      ))}
    </div>
  );

  const VehicleSelector = ({ 
    selected, 
    onSelect,
    type 
  }: { 
    selected: "motor" | "car"; 
    onSelect: (v: "motor" | "car") => void;
    type: "pickup" | "dropoff";
  }) => (
    <RadioGroup
      value={selected}
      onValueChange={(v) => onSelect(v as "motor" | "car")}
      className="flex gap-2"
    >
      <Label
        htmlFor={`${type}-motor`}
        className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
          selected === "motor"
            ? type === "pickup" 
              ? "border-green-500 bg-green-500/10" 
              : "border-accent bg-accent/10"
            : "border-border hover:border-primary/30"
        }`}
      >
        <RadioGroupItem value="motor" id={`${type}-motor`} className="sr-only" />
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          selected === "motor" 
            ? type === "pickup" ? "bg-green-500/20" : "bg-accent/20"
            : "bg-secondary"
        }`}>
          <Bike className={`w-5 h-5 ${
            selected === "motor" 
              ? type === "pickup" ? "text-green-600" : "text-accent" 
              : "text-muted-foreground"
          }`} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm text-foreground">Motor</p>
          <p className="text-xs text-muted-foreground">Lebih cepat & ekonomis</p>
        </div>
      </Label>

      <Label
        htmlFor={`${type}-car`}
        className={`flex-1 flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
          selected === "car"
            ? type === "pickup" 
              ? "border-green-500 bg-green-500/10" 
              : "border-accent bg-accent/10"
            : "border-border hover:border-primary/30"
        }`}
      >
        <RadioGroupItem value="car" id={`${type}-car`} className="sr-only" />
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          selected === "car" 
            ? type === "pickup" ? "bg-green-500/20" : "bg-accent/20"
            : "bg-secondary"
        }`}>
          <Car className={`w-5 h-5 ${
            selected === "car" 
              ? type === "pickup" ? "text-green-600" : "text-accent" 
              : "text-muted-foreground"
          }`} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm text-foreground">Mobil</p>
          <p className="text-xs text-muted-foreground">Nyaman & bawa barang</p>
        </div>
      </Label>
    </RadioGroup>
  );

  return (
    <>
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
                        <p className="text-xs text-muted-foreground">Driver menjemput di lokasi Anda</p>
                      </div>
                    </div>
                    <Switch checked={pickupEnabled} onCheckedChange={setPickupEnabled} />
                  </div>

                  {pickupEnabled && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mt-4"
                    >
                      {/* Provider Selection */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Pilih Provider</p>
                        <ProviderSelector
                          selected={pickupProvider}
                          onSelect={setPickupProvider}
                          type="pickup"
                        />
                      </div>

                      {/* Vehicle Selection */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Pilih Kendaraan</p>
                        <VehicleSelector
                          selected={pickupVehicle}
                          onSelect={setPickupVehicle}
                          type="pickup"
                        />
                      </div>

                      {/* Location Selection with Map */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Lokasi Penjemputan</p>
                        <button
                          onClick={() => setShowPickupMap(true)}
                          className="w-full p-3 rounded-xl border-2 border-dashed border-green-500/50 bg-green-500/5 hover:bg-green-500/10 transition-colors flex items-center gap-3"
                        >
                          <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Map className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1 text-left">
                            {pickupLocation ? (
                              <>
                                <p className="font-medium text-sm text-foreground">Lokasi Dipilih</p>
                                <p className="text-xs text-muted-foreground truncate">{pickupLocation}</p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-sm text-foreground">Pilih di Peta</p>
                                <p className="text-xs text-muted-foreground">Klik untuk memilih lokasi penjemputan</p>
                              </>
                            )}
                          </div>
                          <MapPin className="w-5 h-5 text-green-600" />
                        </button>
                      </div>

                      {/* Price Summary */}
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <img src={providerLogos[pickupProvider]} alt={pickupProvider} className="h-5 object-contain" />
                          <span className="text-xs text-muted-foreground">
                            via {pickupProvider.charAt(0).toUpperCase() + pickupProvider.slice(1)} • {pickupVehicle === "motor" ? "Motor" : "Mobil"}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatPrice(pickupPrice)}</p>
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
                        <p className="text-xs text-muted-foreground">Driver mengantar ke tujuan akhir</p>
                      </div>
                    </div>
                    <Switch checked={dropoffEnabled} onCheckedChange={setDropoffEnabled} />
                  </div>

                  {dropoffEnabled && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 mt-4"
                    >
                      {/* Provider Selection */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Pilih Provider</p>
                        <ProviderSelector
                          selected={dropoffProvider}
                          onSelect={setDropoffProvider}
                          type="dropoff"
                        />
                      </div>

                      {/* Vehicle Selection */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Pilih Kendaraan</p>
                        <VehicleSelector
                          selected={dropoffVehicle}
                          onSelect={setDropoffVehicle}
                          type="dropoff"
                        />
                      </div>

                      {/* Location Selection with Map */}
                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Lokasi Pengantaran</p>
                        <button
                          onClick={() => setShowDropoffMap(true)}
                          className="w-full p-3 rounded-xl border-2 border-dashed border-accent/50 bg-accent/5 hover:bg-accent/10 transition-colors flex items-center gap-3"
                        >
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Map className="w-5 h-5 text-accent" />
                          </div>
                          <div className="flex-1 text-left">
                            {dropoffLocation ? (
                              <>
                                <p className="font-medium text-sm text-foreground">Lokasi Dipilih</p>
                                <p className="text-xs text-muted-foreground truncate">{dropoffLocation}</p>
                              </>
                            ) : (
                              <>
                                <p className="font-medium text-sm text-foreground">Pilih di Peta</p>
                                <p className="text-xs text-muted-foreground">Klik untuk memilih lokasi tujuan</p>
                              </>
                            )}
                          </div>
                          <MapPin className="w-5 h-5 text-accent" />
                        </button>
                      </div>

                      {/* Price Summary */}
                      <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <img src={providerLogos[dropoffProvider]} alt={dropoffProvider} className="h-5 object-contain" />
                          <span className="text-xs text-muted-foreground">
                            via {dropoffProvider.charAt(0).toUpperCase() + dropoffProvider.slice(1)} • {dropoffVehicle === "motor" ? "Motor" : "Mobil"}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent">{formatPrice(dropoffPrice)}</p>
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
                        <span className="text-muted-foreground">
                          Penjemputan ({pickupVehicle === "motor" ? "Motor" : "Mobil"})
                        </span>
                        <span className="font-medium text-green-600">+{formatPrice(pickupPrice)}</span>
                      </div>
                    )}
                    {dropoffEnabled && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Pengantaran ({dropoffVehicle === "motor" ? "Motor" : "Mobil"})
                        </span>
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

      {/* Map Pickers */}
      <MapPicker
        isOpen={showPickupMap}
        onClose={() => setShowPickupMap(false)}
        onSelect={setPickupLocation}
        type="pickup"
      />
      <MapPicker
        isOpen={showDropoffMap}
        onClose={() => setShowDropoffMap(false)}
        onSelect={setDropoffLocation}
        type="dropoff"
      />
    </>
  );
};

export default BusCard;
