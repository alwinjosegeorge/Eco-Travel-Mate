import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  fullAddress: string | null;
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
  const [fullAddress, setFullAddress] = useState<string | null>(null);
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

        // Try to get detailed location using reverse geocoding
        try {
          // Use free reverse geocoding API for detailed address
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'GreenPath/1.0'
              }
            }
          );
          const data = await response.json();
          
          if (data.address) {
            const addr = data.address;
            // Build detailed address, avoiding duplicates
            const parts: string[] = [];
            const seen = new Set<string>();
            
            const addIfUnique = (value: string | undefined) => {
              if (value && !seen.has(value.toLowerCase())) {
                parts.push(value);
                seen.add(value.toLowerCase());
              }
            };
            
            // Extract location parts in order: road -> suburb/village -> town/city -> district -> state
            addIfUnique(addr.road);
            addIfUnique(addr.suburb || addr.neighbourhood || addr.hamlet);
            addIfUnique(addr.village);
            addIfUnique(addr.town || addr.city);
            addIfUnique(addr.county !== addr.town ? addr.county : undefined);
            addIfUnique(addr.state_district);
            addIfUnique(addr.state);
            
            const fullAddr = parts.join(', ');
            setFullAddress(fullAddr);
            
            // Set city for short display
            const cityName = addr.village || addr.town || addr.city || addr.hamlet || addr.suburb || addr.state;
            if (cityName) {
              setCity(cityName);
            }
          }
        } catch (e) {
          console.log('Could not fetch location details');
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
      value={{ latitude, longitude, city, fullAddress, loading, error, requestLocation }}
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
