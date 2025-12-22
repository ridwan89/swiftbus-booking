import { motion } from "framer-motion";
import { Bus, MapPin, Calendar, Clock, User, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bus as BusType, formatPrice } from "@/data/mockData";
import { PickupData } from "./BusCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CheckoutSummaryProps {
  bus: BusType;
  pickupData: PickupData;
  date: string;
  onClose: () => void;
}

const CheckoutSummary = ({ bus, pickupData, date, onClose }: CheckoutSummaryProps) => {
  const navigate = useNavigate();
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalPrice = bus.price + pickupData.pickupPrice + pickupData.dropoffPrice;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulasi proses pembayaran
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsComplete(true);
  };

  const handleViewTracking = () => {
    navigate('/tracking');
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      >
        <div className="bg-card rounded-2xl shadow-elevated p-8 max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Pembayaran Berhasil!</h2>
          <p className="text-muted-foreground mb-6">
            Tiket Anda telah dikonfirmasi. E-ticket telah dikirim ke {passengerEmail}
          </p>
          <div className="p-4 bg-secondary rounded-xl mb-6">
            <p className="text-sm text-muted-foreground">Kode Booking</p>
            <p className="text-2xl font-bold font-mono text-primary">SWB-{Date.now().toString().slice(-8)}</p>
          </div>
          <div className="space-y-3">
            <Button onClick={handleViewTracking} variant="search" className="w-full" size="lg">
              Lihat Status Perjalanan
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full">
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-card rounded-2xl shadow-elevated max-w-2xl w-full my-8"
      >
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Ringkasan Pemesanan</h2>
          <p className="text-sm text-muted-foreground">Periksa detail pesanan Anda sebelum melanjutkan</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Bus Info */}
          <div className="p-4 bg-secondary/50 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
                {bus.logo}
              </div>
              <div>
                <h3 className="font-bold text-foreground">{bus.operator}</h3>
                <p className="text-sm text-muted-foreground">{bus.class}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{date || 'Pilih tanggal'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{bus.departureTime} - {bus.arrivalTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-primary" />
                <span>{bus.from} → {bus.to}</span>
              </div>
            </div>
          </div>

          {/* Pick & Drop Info */}
          {(pickupData.pickupEnabled || pickupData.dropoffEnabled) && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Layanan Pick & Drop</h4>
              {pickupData.pickupEnabled && (
                <div className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Penjemputan</p>
                    <p className="text-sm text-muted-foreground">{pickupData.pickupLocation || 'Lokasi belum dipilih'}</p>
                  </div>
                  <span className="ml-auto font-medium text-green-600">+{formatPrice(pickupData.pickupPrice)}</span>
                </div>
              )}
              {pickupData.dropoffEnabled && (
                <div className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
                  <MapPin className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Pengantaran</p>
                    <p className="text-sm text-muted-foreground">{pickupData.dropoffLocation || 'Lokasi belum dipilih'}</p>
                  </div>
                  <span className="ml-auto font-medium text-accent">+{formatPrice(pickupData.dropoffPrice)}</span>
                </div>
              )}
            </div>
          )}

          {/* Passenger Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Data Penumpang
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="phone">No. Telepon</Label>
                <Input
                  id="phone"
                  placeholder="08xx-xxxx-xxxx"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tiket Bus ({bus.operator})</span>
                <span>{formatPrice(bus.price)}</span>
              </div>
              {pickupData.pickupEnabled && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Layanan Penjemputan</span>
                  <span className="text-green-600">+{formatPrice(pickupData.pickupPrice)}</span>
                </div>
              )}
              {pickupData.dropoffEnabled && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Layanan Pengantaran</span>
                  <span className="text-accent">+{formatPrice(pickupData.dropoffPrice)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-border flex justify-between">
                <span className="font-bold text-lg">Total Pembayaran</span>
                <span className="font-bold text-2xl text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border flex gap-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Batal
          </Button>
          <Button
            onClick={handlePayment}
            variant="search"
            className="flex-1"
            disabled={!passengerName || !passengerPhone || !passengerEmail || isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Memproses...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Bayar Sekarang
              </span>
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutSummary;
