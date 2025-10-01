import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Wind, Eye, Droplets, Thermometer } from "lucide-react";
import { useUserLocation } from "@/hooks/useUserLocation";

interface AirQualityData {
  aqi: number;
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'hazardous';
  pm25: number;
  pm10: number;
  humidity: number;
  temperature: number;
  location: string;
}

const mockData: AirQualityData = {
  aqi: 42,
  status: 'good',
  pm25: 15,
  pm10: 28,
  humidity: 65,
  temperature: 22,
  location: 'Current Location'
};

const getAQIColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'bg-air-excellent';
    case 'good': return 'bg-air-good';
    case 'moderate': return 'bg-air-moderate';
    case 'poor': return 'bg-air-poor';
    case 'hazardous': return 'bg-air-hazardous';
    default: return 'bg-primary';
  }
};

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const AirQualityDashboard = () => {
  const { city } = useUserLocation();
  const displayLocation = city || mockData.location;

  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Air Quality Monitor</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time air quality data to help you plan your travels and outdoor activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main AQI Card */}
          <Card className="p-8 bg-card shadow-eco border-0">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-card-foreground mb-4">
                Air Quality Index
              </h3>
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-primary mb-2">
                  {mockData.aqi}
                </div>
                <Badge 
                  className={`${getAQIColor(mockData.status)} text-white px-4 py-2 text-lg font-medium`}
                >
                  {getStatusText(mockData.status)}
                </Badge>
              </div>
              <Progress 
                value={(mockData.aqi / 300) * 100} 
                className="w-full h-3 mb-4" 
              />
              <p className="text-muted-foreground text-lg">
                📍 {displayLocation}
              </p>
            </div>
          </Card>

          {/* Detailed Metrics */}
          <div className="space-y-4">
            <Card className="p-6 bg-card shadow-eco border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Wind className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground">PM2.5</h4>
                    <p className="text-sm text-muted-foreground">Fine particles</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{mockData.pm25}</div>
                  <div className="text-sm text-muted-foreground">μg/m³</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-eco border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground">PM10</h4>
                    <p className="text-sm text-muted-foreground">Coarse particles</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{mockData.pm10}</div>
                  <div className="text-sm text-muted-foreground">μg/m³</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-eco border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Droplets className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground">Humidity</h4>
                    <p className="text-sm text-muted-foreground">Moisture level</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{mockData.humidity}%</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card shadow-eco border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="text-lg font-semibold text-card-foreground">Temperature</h4>
                    <p className="text-sm text-muted-foreground">Current temp</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{mockData.temperature}°C</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};