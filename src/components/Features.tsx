import { Shield, Clock, Headphones, Wifi, CreditCard, MapPin } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All our buses undergo regular safety inspections and our drivers are professionally trained.",
  },
  {
    icon: Clock,
    title: "On-Time Departures",
    description: "We pride ourselves on punctuality with 95% of our buses departing and arriving on schedule.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our customer service team is available around the clock to assist with your travel needs.",
  },
  {
    icon: Wifi,
    title: "Free WiFi",
    description: "Stay connected during your journey with complimentary high-speed WiFi on all our buses.",
  },
  {
    icon: CreditCard,
    title: "Easy Refunds",
    description: "Flexible cancellation policy with hassle-free refunds up to 24 hours before departure.",
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your bus in real-time and get accurate arrival notifications to your phone.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Travel With Confidence
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Experience the difference with our premium bus service. We go above and beyond to make your journey comfortable and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/15 transition-colors"
            >
              <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
