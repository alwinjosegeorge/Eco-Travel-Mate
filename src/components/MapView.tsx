import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserLocation } from "@/hooks/useUserLocation";

const MapView = () => {
  const { toast } = useToast();
  const { latitude, longitude } = useUserLocation();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>(
    localStorage.getItem('mapbox_token') || ''
  );
  const [isTokenSet, setIsTokenSet] = useState<boolean>(!!localStorage.getItem('mapbox_token'));
  const [searchQuery, setSearchQuery] = useState<string>('');

  const saveToken = () => {
    if (!mapboxToken.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Mapbox token",
        variant: "destructive",
      });
      return;
    }
    
    localStorage.setItem('mapbox_token', mapboxToken);
    setIsTokenSet(true);
    initializeMap();
    
    toast({
      title: "Success",
      description: "Mapbox token saved successfully",
    });
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    // Use user location if available, otherwise default
    const center: [number, number] = (latitude && longitude) 
      ? [longitude, latitude] 
      : [0, 20];
    const zoom = (latitude && longitude) ? 10 : 2;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center,
      zoom,
      projection: 'globe' as any
    });

    // Add user location marker if available
    if (latitude && longitude) {
      new mapboxgl.Marker({ color: '#3b82f6', scale: 1.2 })
        .setLngLat([longitude, latitude])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-3">
              <h3 class="font-bold">Your Location</h3>
              <p class="text-sm text-gray-600">Current position</p>
            </div>
          `)
        )
        .addTo(map.current);
    }

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add geolocate control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      }),
      'top-right'
    );

    // Add atmosphere and fog effects
    map.current.on('style.load', () => {
      if (map.current) {
        map.current.setFog({
          color: 'rgb(220, 240, 220)',
          'high-color': 'rgb(180, 220, 180)',
          'horizon-blend': 0.1,
        });
      }
    });

    // Add sample air quality markers
    const airQualityData = [
      { coords: [-74.006, 40.7128], aqi: 42, city: 'New York' },
      { coords: [2.3522, 48.8566], aqi: 38, city: 'Paris' },
      { coords: [139.6503, 35.6762], aqi: 55, city: 'Tokyo' },
      { coords: [-0.1276, 51.5074], aqi: 47, city: 'London' },
      { coords: [77.2090, 28.6139], aqi: 168, city: 'Delhi' }
    ];

    map.current.on('load', () => {
      airQualityData.forEach((data) => {
        if (map.current) {
          const getMarkerColor = (aqi: number) => {
            if (aqi <= 50) return '#22c55e'; // Green - Good
            if (aqi <= 100) return '#eab308'; // Yellow - Moderate
            if (aqi <= 150) return '#f97316'; // Orange - Unhealthy for sensitive
            if (aqi <= 200) return '#ef4444'; // Red - Unhealthy
            return '#991b1b'; // Dark red - Hazardous
          };

          // Create marker popup
          const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-3">
              <h3 class="font-bold text-lg">${data.city}</h3>
              <p class="text-sm">AQI: <span class="font-semibold">${data.aqi}</span></p>
              <p class="text-xs text-gray-600">Click for detailed info</p>
            </div>
          `);

          // Create marker
          new mapboxgl.Marker({
            color: getMarkerColor(data.aqi),
            scale: 0.8
          })
            .setLngLat(data.coords as [number, number])
            .setPopup(popup)
            .addTo(map.current);
        }
      });
    });
  };

  const searchLocation = async () => {
    if (!searchQuery.trim() || !mapboxToken) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxToken}&limit=1`
      );
      
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        
        if (map.current) {
          map.current.flyTo({
            center: [lng, lat],
            zoom: 10,
            duration: 2000
          });

          // Add marker for searched location
          new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup().setHTML(`
                <div class="p-3">
                  <h3 class="font-bold">${data.features[0].place_name}</h3>
                  <p class="text-sm text-gray-600">Searched location</p>
                </div>
              `)
            )
            .addTo(map.current);
        }

        toast({
          title: "Location Found",
          description: `Navigated to ${data.features[0].place_name}`,
        });
      } else {
        toast({
          title: "Location Not Found",
          description: "Please try a different search term",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to search location",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isTokenSet && mapboxToken) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isTokenSet, mapboxToken, latitude, longitude]);

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Environmental Map</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore real-time air quality data and environmental conditions around the world
          </p>
        </div>

        {!isTokenSet ? (
          <Card className="p-8 bg-card shadow-eco border-0 max-w-md mx-auto">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                Setup Mapbox
              </h3>
              <p className="text-muted-foreground text-sm">
                Enter your Mapbox public token to enable the interactive map
              </p>
            </div>
            
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter your Mapbox public token"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
              />
              <Button 
                onClick={saveToken}
                className="w-full bg-gradient-primary hover:shadow-glow text-white"
              >
                Save Token & Load Map
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Get your token from{' '}
                <a 
                  href="https://mapbox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Search Bar */}
            <Card className="p-4 bg-card shadow-eco border-0">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for a city or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
                    className="pl-10"
                  />
                </div>
                <Button 
                  onClick={searchLocation}
                  className="bg-gradient-primary hover:shadow-glow text-white"
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Map Container */}
            <Card className="overflow-hidden shadow-eco border-0">
              <div ref={mapContainer} className="w-full h-[600px]" />
              
              {/* Map Legend */}
              <div className="p-4 bg-card border-t border-border">
                <h4 className="font-semibold text-card-foreground mb-3">Air Quality Index Legend</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-air-excellent rounded-full"></div>
                    <span>0-50 Good</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-air-good rounded-full"></div>
                    <span>51-100 Moderate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-air-moderate rounded-full"></div>
                    <span>101-150 Sensitive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-air-poor rounded-full"></div>
                    <span>151-200 Unhealthy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-air-hazardous rounded-full"></div>
                    <span>201+ Hazardous</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default MapView;