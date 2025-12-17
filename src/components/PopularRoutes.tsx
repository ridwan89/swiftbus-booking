import { ArrowRight, Clock, Star } from "lucide-react";

const routes = [
  {
    from: "New York",
    to: "Boston",
    duration: "4h 30m",
    price: 45,
    rating: 4.8,
    departures: 12,
  },
  {
    from: "Los Angeles",
    to: "San Francisco",
    duration: "6h 15m",
    price: 55,
    rating: 4.7,
    departures: 8,
  },
  {
    from: "Chicago",
    to: "Detroit",
    duration: "5h 00m",
    price: 38,
    rating: 4.6,
    departures: 10,
  },
  {
    from: "Miami",
    to: "Orlando",
    duration: "3h 45m",
    price: 32,
    rating: 4.9,
    departures: 15,
  },
  {
    from: "Seattle",
    to: "Portland",
    duration: "3h 30m",
    price: 28,
    rating: 4.8,
    departures: 9,
  },
  {
    from: "Dallas",
    to: "Houston",
    duration: "4h 00m",
    price: 35,
    rating: 4.5,
    departures: 11,
  },
];

const PopularRoutes = () => {
  return (
    <section id="routes" className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Popular Routes
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Most Traveled Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular bus routes with frequent departures, competitive prices, and excellent ratings from travelers.
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
                    <p className="text-xs text-muted-foreground">Departure</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-foreground text-right">{route.to}</p>
                    <p className="text-xs text-muted-foreground text-right">Arrival</p>
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
                  <p className="text-xs text-muted-foreground">{route.departures} daily departures</p>
                  <p className="text-lg font-bold text-primary">
                    From ${route.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            View all routes
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
