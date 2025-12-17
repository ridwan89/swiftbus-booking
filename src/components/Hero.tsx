import SearchForm from "@/components/SearchForm";
import heroBus from "@/assets/hero-bus.jpg";

const Hero = () => {
  return (
    <section id="search" className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBus}
          alt="Modern bus on scenic highway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6 animate-fade-up">
            🚌 Trusted by 1M+ travelers
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Your Journey Starts Here
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Book bus tickets to hundreds of destinations across the country. Comfortable rides, affordable prices, and reliable schedules.
          </p>

          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <SearchForm />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">500+</p>
              <p className="text-primary-foreground/60 text-sm">Routes</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">1M+</p>
              <p className="text-primary-foreground/60 text-sm">Happy Travelers</p>
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
