import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Building2, Wallet, QrCode, Smartphone, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethod {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  logo?: string;
  description?: string;
}

interface PaymentMethodsProps {
  selectedMethod: string | null;
  onSelect: (methodId: string) => void;
}

const paymentMethods: PaymentMethod[] = [
  // E-Wallets
  { id: "gopay", name: "GoPay", category: "E-Wallet", icon: <Wallet className="w-5 h-5" />, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/120px-Gopay_logo.svg.png" },
  { id: "ovo", name: "OVO", category: "E-Wallet", icon: <Wallet className="w-5 h-5" />, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/120px-Logo_ovo_purple.svg.png" },
  { id: "dana", name: "DANA", category: "E-Wallet", icon: <Wallet className="w-5 h-5" />, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/120px-Logo_dana_blue.svg.png" },
  { id: "shopeepay", name: "ShopeePay", category: "E-Wallet", icon: <Wallet className="w-5 h-5" />, logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/ShopeePay_logo.svg/120px-ShopeePay_logo.svg.png" },
  
  // Virtual Account
  { id: "bca_va", name: "BCA Virtual Account", category: "Virtual Account", icon: <Building2 className="w-5 h-5" /> },
  { id: "bni_va", name: "BNI Virtual Account", category: "Virtual Account", icon: <Building2 className="w-5 h-5" /> },
  { id: "bri_va", name: "BRI Virtual Account", category: "Virtual Account", icon: <Building2 className="w-5 h-5" /> },
  { id: "mandiri_va", name: "Mandiri Virtual Account", category: "Virtual Account", icon: <Building2 className="w-5 h-5" /> },
  
  // QRIS
  { id: "qris", name: "QRIS", category: "QRIS", icon: <QrCode className="w-5 h-5" />, description: "Scan QR di semua aplikasi" },
  
  // Credit Card
  { id: "credit_card", name: "Kartu Kredit/Debit", category: "Kartu", icon: <CreditCard className="w-5 h-5" />, description: "Visa, Mastercard, JCB" },
  
  // Retail
  { id: "indomaret", name: "Indomaret", category: "Gerai Retail", icon: <Smartphone className="w-5 h-5" /> },
  { id: "alfamart", name: "Alfamart", category: "Gerai Retail", icon: <Smartphone className="w-5 h-5" /> },
];

const PaymentMethods = ({ selectedMethod, onSelect }: PaymentMethodsProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("E-Wallet");

  const categories = [...new Set(paymentMethods.map((m) => m.category))];

  const groupedMethods = categories.reduce((acc, category) => {
    acc[category] = paymentMethods.filter((m) => m.category === category);
    return acc;
  }, {} as Record<string, PaymentMethod[]>);

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Metode Pembayaran
      </h4>

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="border border-border rounded-xl overflow-hidden">
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full p-3 flex items-center justify-between bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="font-medium text-foreground">{category}</span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  expandedCategory === category && "rotate-90"
                )}
              />
            </button>

            {/* Methods List */}
            {expandedCategory === category && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="divide-y divide-border"
              >
                {groupedMethods[category].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => onSelect(method.id)}
                    className={cn(
                      "w-full p-3 flex items-center gap-3 transition-colors",
                      selectedMethod === method.id
                        ? "bg-primary/10"
                        : "hover:bg-secondary/30"
                    )}
                  >
                    {/* Logo or Icon */}
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center border border-border">
                      {method.logo ? (
                        <img
                          src={method.logo}
                          alt={method.name}
                          className="h-6 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = `<span class="text-primary">${method.icon}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-primary">{method.icon}</span>
                      )}
                    </div>

                    {/* Name & Description */}
                    <div className="flex-1 text-left">
                      <p className="font-medium text-foreground">{method.name}</p>
                      {method.description && (
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      )}
                    </div>

                    {/* Selected Indicator */}
                    {selectedMethod === method.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary-foreground" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
