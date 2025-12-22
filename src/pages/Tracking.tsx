import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bike, 
  Building2, 
  Bus, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Phone, 
  User,
  Navigation,
  RefreshCw
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getTrackingSteps, TrackingStatus, formatPrice } from "@/data/mockData";

const statusMessages: Record<TrackingStatus, string> = {
  waiting_pickup: "Menunggu penjemputan",
  driver_on_way: "Driver sedang dalam perjalanan",
  arrived_at_pool: "Tiba di pool bus",
  bus_departed: "Bus dalam perjalanan",
  bus_arrived: "Bus tiba di tujuan",
  driver_dropping: "Driver mengantar ke tujuan akhir",
  completed: "Perjalanan selesai",
};

const Tracking = () => {
  const [currentStatus, setCurrentStatus] = useState<TrackingStatus>("driver_on_way");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Demo: Auto-advance status setiap 10 detik
  useEffect(() => {
    const statusOrder: TrackingStatus[] = [
      "waiting_pickup",
      "driver_on_way", 
      "arrived_at_pool",
      "bus_departed",
      "bus_arrived",
      "driver_dropping",
      "completed",
    ];

    const interval = setInterval(() => {
      setCurrentStatus((prev) => {
        const currentIndex = statusOrder.indexOf(prev);
        if (currentIndex < statusOrder.length - 1) {
          return statusOrder[currentIndex + 1];
        }
        return statusOrder[0]; // Loop back for demo
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const steps = getTrackingSteps(currentStatus);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getStepIcon = (iconName: string, status: string) => {
    const iconClass = `w-6 h-6 ${
      status === "completed" 
        ? "text-green-500" 
        : status === "active" 
        ? "text-primary" 
        : "text-muted-foreground"
    }`;

    switch (iconName) {
      case "motorcycle":
        return <Bike className={iconClass} />;
      case "building":
        return <Building2 className={iconClass} />;
      case "bus":
        return <Bus className={iconClass} />;
      case "mapPin":
        return <MapPin className={iconClass} />;
      case "checkCircle":
        return <CheckCircle className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Tracking Perjalanan
                </h1>
                <p className="text-muted-foreground">Pantau status perjalanan Anda secara real-time</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {/* Booking Info Card */}
            <div className="bg-card rounded-2xl shadow-elevated p-6 border border-border">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                    🚌
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">PO 27Trans - Executive</h3>
                    <p className="text-sm text-muted-foreground">Jakarta → Surabaya</p>
                    <p className="text-xs text-muted-foreground">Kode Booking: SWB-87654321</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    currentStatus === "completed"
                      ? "bg-green-500/10 text-green-600"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {statusMessages[currentStatus]}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl shadow-elevated p-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-6">Status Perjalanan</h2>
                
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                  
                  {/* Steps */}
                  <div className="space-y-6">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-start gap-4"
                      >
                        {/* Icon Circle */}
                        <div className={`
                          relative z-10 w-12 h-12 rounded-full flex items-center justify-center
                          ${step.status === "completed" 
                            ? "bg-green-500/10 border-2 border-green-500" 
                            : step.status === "active"
                            ? "bg-primary/10 border-2 border-primary animate-pulse"
                            : "bg-muted border-2 border-border"
                          }
                        `}>
                          {step.status === "completed" ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            getStepIcon(step.icon, step.status)
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-semibold ${
                              step.status === "pending" 
                                ? "text-muted-foreground" 
                                : "text-foreground"
                            }`}>
                              {step.title}
                            </h3>
                            {step.time && (
                              <span className="text-xs text-muted-foreground">
                                {step.time}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {step.description}
                          </p>

                          {/* Active Step Extra Info */}
                          {step.status === "active" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                            >
                              {step.icon === "motorcycle" && (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                      <User className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                      <p className="font-medium text-foreground">Budi Santoso</p>
                                      <p className="text-xs text-muted-foreground">Honda Vario • B 1234 ABC</p>
                                    </div>
                                  </div>
                                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    Hubungi
                                  </Button>
                                </div>
                              )}
                              {step.icon === "bus" && (
                                <div className="text-sm">
                                  <p className="text-muted-foreground">Estimasi tiba: <span className="font-medium text-foreground">14:00 WIB</span></p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder & Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <div className="bg-card rounded-2xl shadow-elevated overflow-hidden border border-border">
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/5 to-accent/5">
                  {/* Dummy Map Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Navigation className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">Live Map View</p>
                      <p className="text-sm text-muted-foreground">Tracking posisi real-time</p>
                    </div>
                  </div>
                  
                  {/* Animated dots representing route */}
                  <motion.div
                    animate={{
                      x: [0, 100, 200, 300],
                      y: [50, 30, 60, 40],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute top-1/2 left-4 w-4 h-4 bg-primary rounded-full shadow-lg"
                  />
                  
                  {/* Start point */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-card/90 px-3 py-2 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs font-medium">Jakarta</span>
                  </div>
                  
                  {/* End point */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-card/90 px-3 py-2 rounded-lg">
                    <div className="w-3 h-3 bg-accent rounded-full" />
                    <span className="text-xs font-medium">Surabaya</span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="bg-card rounded-2xl shadow-elevated p-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">Detail Perjalanan</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Penjemputan</p>
                      <p className="font-medium text-foreground">Jl. Sudirman No. 45, Jakarta</p>
                      <p className="text-xs text-muted-foreground">Estimasi jemput: 05:00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pool Keberangkatan</p>
                      <p className="font-medium text-foreground">Terminal Pulogebang, Jakarta Timur</p>
                      <p className="text-xs text-muted-foreground">Berangkat: 06:00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pool Kedatangan</p>
                      <p className="font-medium text-foreground">Terminal Purabaya, Surabaya</p>
                      <p className="text-xs text-muted-foreground">Estimasi tiba: 14:00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Pengantaran</p>
                      <p className="font-medium text-foreground">Jl. Raya Darmo No. 12, Surabaya</p>
                      <p className="text-xs text-muted-foreground">Estimasi sampai: 14:45 WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span className="text-xs">Hubungi CS</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                  <Bus className="w-5 h-5" />
                  <span className="text-xs">Detail Bus</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Tracking;
