import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
}

const LocationContext = createContext<LocationState | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>('Your Location');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      const errorMsg = 'Geolocation is not supported by your browser';
      setError(errorMsg);
      toast({
        title: "Location Error",
        description: errorMsg,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setLatitude(lat);
        setLongitude(lng);
        setLoading(false);

        // Try to get city name using reverse geocoding (optional - only if mapbox token available)
        const mapboxToken = localStorage.getItem('mapbox_token');
        if (mapboxToken) {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&types=place`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              setCity(data.features[0].text);
            }
          } catch (e) {
            console.log('Could not fetch city name');
          }
        }

        toast({
          title: "Location Accessed",
          description: `Your location has been detected`,
        });
      },
      (err) => {
        let errorMsg = 'Unable to retrieve your location';
        if (err.code === err.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied. Please enable location access.';
        }
        setError(errorMsg);
        setLoading(false);
        toast({
          title: "Location Error",
          description: errorMsg,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <LocationContext.Provider
      value={{ latitude, longitude, city, loading, error, requestLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useUserLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useUserLocation must be used within a LocationProvider');
  }
  return context;
};
