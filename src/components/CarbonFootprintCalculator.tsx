import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Car, Plane, Train, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FootprintResult {
  transport: number;
  distance: number;
  emissions: number;
  equivalent: string;
}

export const CarbonFootprintCalculator = () => {
  const { toast } = useToast();
  const [transportType, setTransportType] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [result, setResult] = useState<FootprintResult | null>(null);

  const transportFactors = {
    car: { factor: 0.21, icon: Car, label: "Car" },
    plane: { factor: 0.25, icon: Plane, label: "Airplane" },
    train: { factor: 0.04, icon: Train, label: "Train" },
    bus: { factor: 0.08, icon: Car, label: "Bus" }
  };

  const calculateFootprint = () => {
    if (!transportType || !distance) {
      toast({
        title: "Missing Information",
        description: "Please select transport type and enter distance",
        variant: "destructive",
      });
      return;
    }

    const distanceNum = parseFloat(distance);
    const factor = transportFactors[transportType as keyof typeof transportFactors]?.factor || 0;
    const emissions = distanceNum * factor;
    
    // Calculate equivalent (trees needed to offset)
    const treesNeeded = Math.ceil(emissions / 22); // Average tree absorbs 22kg CO2/year

    setResult({
      transport: factor,
      distance: distanceNum,
      emissions: emissions,
      equivalent: `${treesNeeded} trees for 1 year`
    });

    toast({
      title: "Carbon Footprint Calculated",
      description: `Your trip will produce ${emissions.toFixed(2)} kg CO2`,
    });
  };

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Carbon Footprint Calculator</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate the environmental impact of your travels and discover ways to offset your carbon footprint
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card className="p-8 bg-card shadow-eco border-0">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold text-card-foreground">Trip Calculator</h3>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="transport" className="text-base font-medium text-card-foreground">
                  Transportation Method
                </Label>
                <Select value={transportType} onValueChange={setTransportType}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select your transport method" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(transportFactors).map(([key, { icon: Icon, label }]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="distance" className="text-base font-medium text-card-foreground">
                  Distance (km)
                </Label>
                <Input
                  id="distance"
                  type="number"
                  placeholder="Enter distance in kilometers"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={calculateFootprint}
                className="w-full bg-gradient-primary hover:shadow-glow text-white font-medium py-3"
              >
                Calculate Carbon Footprint
              </Button>
            </div>
          </Card>

          {/* Results */}
          <Card className="p-8 bg-card shadow-eco border-0">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-semibold text-card-foreground">Environmental Impact</h3>
            </div>

            {result ? (
              <div className="space-y-6">
                <div className="text-center p-6 bg-gradient-secondary rounded-lg">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {result.emissions.toFixed(2)} kg
                  </div>
                  <div className="text-lg text-muted-foreground">CO₂ Emissions</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium text-card-foreground">Distance</span>
                    <span className="text-primary font-semibold">{result.distance} km</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium text-card-foreground">Emission Factor</span>
                    <span className="text-primary font-semibold">{result.transport} kg CO₂/km</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="font-medium text-card-foreground">To Offset</span>
                    <span className="text-primary font-semibold">{result.equivalent}</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">💡 Eco Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Consider train travel for shorter distances</li>
                    <li>• Combine multiple trips to reduce frequency</li>
                    <li>• Look for carbon offset programs</li>
                    <li>• Choose eco-friendly accommodations</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Enter your trip details to calculate your carbon footprint</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};