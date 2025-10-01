import { Button } from "@/components/ui/button";
import { MapPin, Leaf, Wind, Car } from "lucide-react";
import heroImage from "@/assets/hero-eco-travel.jpg";
import { useUserLocation } from "@/hooks/useUserLocation";

export const HeroSection = () => {
  const { requestLocation, latitude, fullAddress } = useUserLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <div className="mb-8 flex justify-center space-x-4">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Wind className="w-8 h-8 text-white" />
          </div>
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <Car className="w-8 h-8 text-white" />
          </div>
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-lg">
          GreenPath
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Your intelligent eco-travel companion. Track carbon footprint, monitor air quality, 
          and get AI-powered insights for sustainable journeys.
        </p>
        
        {latitude && fullAddress && (
          <div className="mb-6 flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 max-w-3xl mx-auto">
            <MapPin className="w-5 h-5 text-white flex-shrink-0" />
            <span className="text-white text-base md:text-lg font-medium">{fullAddress}</span>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            onClick={requestLocation}
            disabled={!!latitude}
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm px-8 py-4 text-lg font-medium transition-all duration-300 hover:shadow-glow disabled:opacity-50"
          >
            {latitude ? '✓ Location Set' : 'Start Your Journey'}
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent hover:bg-white/10 text-white border-white/40 hover:border-white/60 px-8 py-4 text-lg font-medium transition-all duration-300"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-primary-glow/20 rounded-full blur-lg animate-pulse" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-accent/30 rounded-full blur-md animate-pulse" />
    </section>
  );
};
