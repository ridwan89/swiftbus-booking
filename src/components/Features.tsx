import { Shield, Clock, Headphones, Wifi, CreditCard, MapPin } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Semua bus kami menjalani inspeksi keamanan rutin dan pengemudi kami terlatih secara profesional.",
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    description: "Kami bangga dengan ketepatan waktu dengan 95% bus kami berangkat dan tiba sesuai jadwal.",
  },
  {
    icon: Headphones,
    title: "Layanan 24 Jam",
    description: "Tim customer service kami siap membantu kapan saja untuk kebutuhan perjalananmu.",
  },
  {
    icon: Wifi,
    title: "WiFi Gratis",
    description: "Tetap terhubung selama perjalanan dengan WiFi gratis berkecepatan tinggi di semua bus kami.",
  },
  {
    icon: CreditCard,
    title: "Refund Mudah",
    description: "Kebijakan pembatalan fleksibel dengan pengembalian dana mudah hingga 24 jam sebelum keberangkatan.",
  },
  {
    icon: MapPin,
    title: "Lacak Real-time",
    description: "Lacak bus secara real-time dan dapatkan notifikasi kedatangan akurat di HP-mu.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-hero-gradient">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-medium mb-4">
            Mengapa Pilih Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Perjalanan dengan Keyakinan
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Rasakan perbedaan dengan layanan bus premium kami. Kami berusaha lebih untuk membuat perjalananmu nyaman dan berkesan.
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
