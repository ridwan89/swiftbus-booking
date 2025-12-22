import { Link } from "react-router-dom";
import { Bus, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Pesan Tiket", href: "/booking" },
    { label: "Lacak Perjalanan", href: "/tracking" },
    { label: "Admin Dashboard", href: "/admin" },
    { label: "Promo & Diskon", href: "#" },
  ];

  const supportLinks = [
    { label: "Pusat Bantuan", href: "#" },
    { label: "Kebijakan Pembatalan", href: "#" },
    { label: "Kebijakan Refund", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
  ];

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Bus className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">SwiftBus</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Partner terpercaya untuk perjalanan bus yang nyaman dan andal. Pesan tiket online dengan layanan Pick & Drop door-to-door.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link to={link.href} className="text-background/70 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-background/70 hover:text-primary transition-colors text-sm">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Bantuan</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">Jl. Sudirman No. 123, Kelurahan Karet, Kecamatan Setiabudi, Jakarta Selatan 12920</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-background/70 text-sm">+62 21 5555 1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-background/70 text-sm">cs@swiftbus.co.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2024 SwiftBus. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-background/50 hover:text-primary transition-colors text-sm">Syarat</a>
            <a href="#" className="text-background/50 hover:text-primary transition-colors text-sm">Privasi</a>
            <a href="#" className="text-background/50 hover:text-primary transition-colors text-sm">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
