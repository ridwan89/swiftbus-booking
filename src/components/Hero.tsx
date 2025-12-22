import { Link } from "react-router-dom";
import { ArrowRight, Bike, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBus from "@/assets/hero-bus.jpg";

const Hero = () => {
  return (
    <section id="search" className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBus}
          alt="Bus modern di jalan raya"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6 animate-fade-up">
            🚌 Dipercaya 1 Juta+ Penumpang
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Perjalananmu Dimulai di Sini
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Pesan tiket bus ke ratusan destinasi di seluruh Pulau Jawa. Perjalanan nyaman, harga terjangkau, dan jadwal terpercaya.
          </p>

          {/* Pick & Drop Feature Highlight */}
          <div className="bg-card/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Bike className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-foreground">Pick & Drop Add-on</h3>
                <p className="text-sm text-primary-foreground/70">Layanan penjemputan & pengantaran door-to-door</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>Dijemput dari rumah</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Diantar ke tujuan akhir</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/booking">
              <Button variant="search" size="xl" className="text-base">
                Pesan Tiket Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/tracking">
              <Button variant="outline" size="xl" className="text-base bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                Lacak Perjalanan
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">500+</p>
              <p className="text-primary-foreground/60 text-sm">Rute</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">1Jt+</p>
              <p className="text-primary-foreground/60 text-sm">Penumpang Puas</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">4.8</p>
              <p className="text-primary-foreground/60 text-sm">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
