import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, X } from 'lucide-react';
import { useUserLocation } from '@/hooks/useUserLocation';

export const LocationPrompt = () => {
  const { latitude, requestLocation, loading } = useUserLocation();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show prompt after 1 second if location not set and not dismissed
    const timer = setTimeout(() => {
      if (!latitude && !dismissed) {
        setShowPrompt(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [latitude, dismissed]);

  const handleRequestLocation = () => {
    requestLocation();
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowPrompt(false);
  };

  if (!showPrompt || latitude) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-card shadow-eco border-0 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleDismiss}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-card-foreground mb-2">
            Share Your Location
          </h3>
          <p className="text-muted-foreground">
            Allow GreenPath to access your current location to provide personalized air quality data, 
            carbon footprint calculations, and environmental insights for your area.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleRequestLocation}
            disabled={loading}
            className="w-full bg-gradient-primary hover:shadow-glow text-white"
          >
            {loading ? 'Getting Location...' : 'Allow Location Access'}
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            className="w-full"
          >
            Not Now
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Your location data is only used to provide accurate environmental information and is not stored or shared.
        </p>
      </Card>
    </div>
  );
};
