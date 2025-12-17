import { Search, CreditCard, CheckCircle2, Ticket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Cari Rute",
    description: "Masukkan kota keberangkatan dan tujuan, pilih tanggal perjalanan, dan temukan bus yang tersedia.",
    color: "bg-primary",
  },
  {
    icon: Ticket,
    title: "Pilih Bus",
    description: "Bandingkan harga, jadwal, dan fasilitas. Pilih bus yang paling sesuai kebutuhanmu.",
    color: "bg-teal-dark",
  },
  {
    icon: CreditCard,
    title: "Bayar",
    description: "Bayar dengan aman via transfer bank, e-wallet, atau kartu kredit. Proses cepat dan mudah.",
    color: "bg-accent",
  },
  {
    icon: CheckCircle2,
    title: "Terima Tiket",
    description: "Dapatkan e-tiket langsung via email dan SMS. Tunjukkan di HP saat naik bus.",
    color: "bg-primary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Cara Pemesanan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pesan Tiket dalam 4 Langkah Mudah
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proses pemesanan kami yang simpel memudahkanmu untuk mendapatkan kursi di bus manapun dengan cepat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center shadow-card mb-6`}>
                  <step.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground mb-3">
                  Langkah {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
