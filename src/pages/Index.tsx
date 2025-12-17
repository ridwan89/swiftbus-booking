import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularRoutes from "@/components/PopularRoutes";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <PopularRoutes />
        <HowItWorks />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
