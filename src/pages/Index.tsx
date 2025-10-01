import { HeroSection } from "@/components/HeroSection";
import { AirQualityDashboard } from "@/components/AirQualityDashboard";
import { CarbonFootprintCalculator } from "@/components/CarbonFootprintCalculator";
import MapView from "@/components/MapView";
import { AIAssistantChat } from "@/components/AIAssistantChat";
import { LocationPrompt } from "@/components/LocationPrompt";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LocationPrompt />
      <HeroSection />
      <AirQualityDashboard />
      <CarbonFootprintCalculator />
      <MapView />
      <AIAssistantChat />
    </div>
  );
};

export default Index;
