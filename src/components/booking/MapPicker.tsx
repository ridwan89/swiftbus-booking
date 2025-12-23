import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, X, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MapPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  type: "pickup" | "dropoff";
}

const MapPicker = ({ isOpen, onClose, onSelect, type }: MapPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);

  // Dummy locations for demonstration
  const suggestedLocations = [
    { lat: -6.9175, lng: 107.6191, address: "Jl. Braga No. 99, Bandung" },
    { lat: -6.9147, lng: 107.6098, address: "Jl. Asia Afrika No. 8, Bandung" },
    { lat: -6.8943, lng: 107.6108, address: "Jl. Dago No. 45, Bandung" },
    { lat: -6.9251, lng: 107.6367, address: "Jl. Buah Batu No. 123, Bandung" },
    { lat: -7.2575, lng: 112.7521, address: "Jl. Tunjungan No. 65, Surabaya" },
    { lat: -7.2508, lng: 112.7683, address: "Jl. Pemuda No. 31, Surabaya" },
    { lat: -6.1754, lng: 106.8272, address: "Jl. Sudirman No. 52, Jakarta" },
    { lat: -6.2088, lng: 106.8456, address: "Jl. Gatot Subroto No. 27, Jakarta" },
  ];

  const filteredLocations = suggestedLocations.filter((loc) =>
    loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Simulate getting address from coordinates
    const dummyAddress = `Jl. Lokasi Terpilih ${Math.floor(x)}-${Math.floor(y)}, Koordinat: ${x.toFixed(2)}, ${y.toFixed(2)}`;
    setSelectedLocation({ lat: y, lng: x, address: dummyAddress });
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelect(selectedLocation.address);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-elevated max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-bold text-foreground">
              Pilih Lokasi {type === "pickup" ? "Penjemputan" : "Pengantaran"}
            </h3>
            <p className="text-sm text-muted-foreground">Klik pada peta atau cari lokasi</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Map Placeholder - Interactive */}
          <div
            onClick={handleMapClick}
            className="relative h-64 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl overflow-hidden cursor-crosshair border-2 border-dashed border-primary/30"
          >
            {/* Grid overlay to simulate map */}
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-primary/5" />
              ))}
            </div>

            {/* Roads simulation */}
            <div className="absolute inset-0">
              <div className="absolute top-1/3 left-0 right-0 h-2 bg-gray-300/50" />
              <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-300/30" />
              <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-300/50" />
              <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-300/30" />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-green-500/30 rounded-full" />
            <div className="absolute top-8 right-8 w-12 h-12 bg-blue-500/30 rounded-lg" />
            <div className="absolute bottom-6 left-1/3 w-6 h-6 bg-yellow-500/30 rounded" />
            <div className="absolute bottom-10 right-1/4 w-10 h-10 bg-purple-500/30 rounded-full" />

            {/* Selected location marker */}
            {selectedLocation && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute"
                style={{
                  left: `${selectedLocation.lng}%`,
                  top: `${selectedLocation.lat}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="relative">
                  <MapPin className="w-8 h-8 text-primary fill-primary/20" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full animate-ping" />
                </div>
              </motion.div>
            )}

            {/* Center crosshair */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-primary/30 text-xs">Klik untuk pilih lokasi</div>
            </div>

            {/* Current location button */}
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-3 right-3 shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedLocation({ lat: 50, lng: 50, address: "Lokasi Saya Saat Ini (GPS)" });
              }}
            >
              <Navigation className="w-4 h-4 mr-1" />
              Lokasi Saya
            </Button>
          </div>

          {/* Selected Location */}
          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-primary/10 rounded-lg flex items-start gap-3"
            >
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-foreground">Lokasi Dipilih</p>
                <p className="text-sm text-muted-foreground">{selectedLocation.address}</p>
              </div>
            </motion.div>
          )}

          {/* Suggested Locations */}
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <p className="text-sm font-medium text-muted-foreground">Lokasi Populer</p>
            {filteredLocations.slice(0, 4).map((loc, index) => (
              <button
                key={index}
                onClick={() => setSelectedLocation(loc)}
                className="w-full p-2 text-left rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 text-sm"
              >
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">{loc.address}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Batal
          </Button>
          <Button
            variant="search"
            onClick={handleConfirm}
            disabled={!selectedLocation}
            className="flex-1"
          >
            Konfirmasi Lokasi
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MapPicker;
