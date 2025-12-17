import { ArrowRight, Clock, Star } from "lucide-react";

const routes = [
  {
    from: "Jakarta",
    to: "Bandung",
    duration: "3j 00m",
    price: 85000,
    rating: 4.8,
    departures: 15,
  },
  {
    from: "Jakarta",
    to: "Surabaya",
    duration: "12j 00m",
    price: 250000,
    rating: 4.7,
    departures: 8,
  },
  {
    from: "Bandung",
    to: "Yogyakarta",
    duration: "8j 30m",
    price: 180000,
    rating: 4.6,
    departures: 10,
  },
  {
    from: "Jakarta",
    to: "Semarang",
    duration: "7j 00m",
    price: 150000,
    rating: 4.9,
    departures: 12,
  },
  {
    from: "Surabaya",
    to: "Malang",
    duration: "2j 30m",
    price: 45000,
    rating: 4.8,
    departures: 20,
  },
  {
    from: "Yogyakarta",
    to: "Solo",
    duration: "1j 30m",
    price: 35000,
    rating: 4.5,
    departures: 25,
  },
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const PopularRoutes = () => {
  return (
    <section id="routes" className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Rute Populer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Destinasi Paling Diminati
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan rute bus paling populer dengan keberangkatan rutin, harga kompetitif, dan rating terbaik dari penumpang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{route.from[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{route.from}</p>
                    <p className="text-xs text-muted-foreground">Keberangkatan</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-foreground text-right">{route.to}</p>
                    <p className="text-xs text-muted-foreground text-right">Tujuan</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <span className="text-lg font-bold text-accent">{route.to[0]}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {route.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{route.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{route.departures} keberangkatan/hari</p>
                  <p className="text-lg font-bold text-primary">
                    Mulai {formatPrice(route.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            Lihat semua rute
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
