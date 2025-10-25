import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../utils/googleMaps";

interface TravelMapProps {
  route: { lat: number; lng: number }[];
  places: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    category?: string;
    photos?: string[];
  }[];
  // Optional: for country-level map to show transit route between cities
  transitRoute?: {
    cities: {
      name: string;
      lat: number;
      lng: number;
    }[];
  };
}

export function TravelMap({ route, places, transitRoute }: TravelMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polylineRef = useRef<any>(null);
  const directionsRenderersRef = useRef<any[]>([]);
  const currentInfoWindowRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Debug logging
  console.log('TravelMap render:', { 
    placesLength: places.length, 
    routeLength: route.length, 
    transitRoute,
    hasTransitRoute: !!transitRoute,
    transitCitiesCount: transitRoute?.cities?.length || 0
  });

  // Don't render map if there's no data to display
  if (places.length === 0 && route.length < 2 && !transitRoute) {
    console.log('TravelMap: No data to display, returning null');
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    // Create a dedicated div for the map that React won't touch
    if (containerRef.current && !mapRef.current) {
      const mapDiv = document.createElement("div");
      mapDiv.className = "w-full h-full";
      containerRef.current.appendChild(mapDiv);
      mapRef.current = mapDiv;
    }

    const initializeMap = async () => {
      try {
        await loadGoogleMaps();

        if (
          !isMounted ||
          !mapRef.current ||
          !window.google ||
          !window.google.maps
        )
          return;

        // Calculate bounds and center
        const allPoints = places.length > 0 ? places : (route.length > 0 ? route : (transitRoute?.cities || []));
        if (allPoints.length === 0) return;

        const bounds = new window.google.maps.LatLngBounds();

        // Create center point
        const centerLat =
          allPoints.reduce((sum, p) => sum + p.lat, 0) /
          allPoints.length;
        const centerLng =
          allPoints.reduce((sum, p) => sum + p.lng, 0) /
          allPoints.length;

        // Initialize map
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom: 8,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        mapInstanceRef.current = map;

        // Clear existing markers safely
        markersRef.current.forEach((marker) => {
          try {
            if (marker && marker.map !== null) {
              marker.map = null;
            }
          } catch (e) {
            // Ignore errors during cleanup
          }
        });
        markersRef.current = [];

        // Clear existing polyline
        if (polylineRef.current) {
          try {
            polylineRef.current.setMap(null);
          } catch (e) {
            // Ignore errors
          }
          polylineRef.current = null;
        }

        // Add markers for places using classic Marker API
        if (places.length > 0) {
          console.log(
            "TravelMap: Adding markers for places:",
            places,
          );
          for (let index = 0; index < places.length; index++) {
            const place = places[index];
            const position = { lat: place.lat, lng: place.lng };

            // Determine emoji based on category
            let categoryEmoji = "";
            let categoryLabel = "";
            let pinLabel = (index + 1).toString(); // Default to number

            if (place.category) {
              console.log(
                `Place ${place.name} has category: ${place.category}`,
              );
              switch (place.category.toLowerCase()) {
                case "sightseeing":
                  categoryEmoji = "🏛️";
                  categoryLabel = "Поглядеть";
                  pinLabel = "🏛️";
                  break;
                case "food":
                  categoryEmoji = "🍽️";
                  categoryLabel = "Поесть еду";
                  pinLabel = "🍽️";
                  break;
                case "coffee":
                  categoryEmoji = "☕";
                  categoryLabel = "Попить кофе";
                  pinLabel = "☕";
                  break;
              }
              console.log(
                `Emoji: ${categoryEmoji}, Label: ${categoryLabel}`,
              );
            } else {
              console.log(
                `Place ${place.name} has NO category`,
              );
            }

            // Create custom pin icon with light blue color
            const pinIcon = {
              path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
              fillColor: "#60a5fa",
              fillOpacity: 1,
              strokeColor: "#3b82f6",
              strokeWeight: 2,
              scale: 1.5,
              anchor: new window.google.maps.Point(12, 22),
              labelOrigin: new window.google.maps.Point(12, 9),
            };

            // Create marker
            const marker = new window.google.maps.Marker({
              position,
              map,
              title: place.name,
              icon: pinIcon,
              label: {
                text: pinLabel,
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
              },
              animation: window.google.maps.Animation.DROP,
            });

            // Create info window with category and optional photo
            let infoWindowContent =
              '<div style="position: relative; padding: 8px; max-width: 200px;" id="info-window-' +
              place.id +
              '">';

            // Add close button
            infoWindowContent +=
              '<button data-close-info-window="' +
              place.id +
              '" style="position: absolute; top: 4px; right: 4px; background: rgba(255, 255, 255, 0.9); border: 1px solid #ddd; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; line-height: 1; padding: 0; color: #666; z-index: 1; transition: all 0.2s;" onmouseover="this.style.background=\'#f5f5f5\'; this.style.color=\'#000\';" onmouseout="this.style.background=\'rgba(255, 255, 255, 0.9)\'; this.style.color=\'#666\';" title="Close">&times;</button>';

            // Add photo if available
            if (place.photos && place.photos.length > 0) {
              infoWindowContent +=
                '<img src="' +
                place.photos[0] +
                '" alt="' +
                place.name +
                '" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />';
            }

            if (place.category && categoryLabel) {
              infoWindowContent +=
                '<div style="font-weight: 500; margin: 0; padding-right: 20px;">' +
                place.name +
                "</div>";
              infoWindowContent +=
                '<div style="font-size: 13px; color: #666; margin: 2px 0 0 0;">' +
                categoryEmoji +
                " " +
                categoryLabel +
                "</div>";
            } else {
              infoWindowContent +=
                '<div style="font-weight: 500; margin: 0; padding-right: 20px;">' +
                place.name +
                "</div>";
            }
            infoWindowContent += "</div>";

            console.log(
              `InfoWindow HTML for ${place.name}:`,
              infoWindowContent,
            );

            const infoWindow =
              new window.google.maps.InfoWindow({
                content: infoWindowContent,
              });

            marker.addListener("click", () => {
              // Close the currently open InfoWindow if there is one
              if (currentInfoWindowRef.current) {
                currentInfoWindowRef.current.close();
              }
              // Open the new InfoWindow and store reference
              infoWindow.open(map, marker);
              currentInfoWindowRef.current = infoWindow;

              // Add close button event listener after InfoWindow is rendered
              setTimeout(() => {
                const closeButton = document.querySelector(
                  '[data-close-info-window="' + place.id + '"]',
                );
                if (closeButton) {
                  closeButton.addEventListener("click", () => {
                    infoWindow.close();
                    currentInfoWindowRef.current = null;
                  });
                }
              }, 100);
            });

            markersRef.current.push(marker);
            bounds.extend(position);
          }

          // Fit map to markers
          map.fitBounds(bounds);
        }

        // Only draw polyline if we have a route and no places (places-only view shouldn't show routes)
        if (route.length >= 2 && places.length === 0) {
          const path = route.map((p) => ({
            lat: p.lat,
            lng: p.lng,
          }));

          polylineRef.current = new window.google.maps.Polyline(
            {
              path,
              geodesic: true,
              strokeColor: "#030213",
              strokeOpacity: 1.0,
              strokeWeight: 3,
              map,
            },
          );

          route.forEach((point) => {
            bounds.extend({ lat: point.lat, lng: point.lng });
          });

          map.fitBounds(bounds);
        }

        // Draw transit route between cities if provided - each segment with different color
        if (transitRoute && transitRoute.cities.length >= 2) {
          const directionsService = new window.google.maps.DirectionsService();
          
          // Color palette for different segments
          const segmentColors = [
            "#3b82f6", // blue
            "#ef4444", // red
            "#10b981", // green
            "#f59e0b", // amber
            "#8b5cf6", // violet
            "#ec4899", // pink
            "#06b6d4", // cyan
            "#f97316", // orange
          ];

          // Create a separate route for each city pair
          for (let i = 0; i < transitRoute.cities.length - 1; i++) {
            const origin = { 
              lat: transitRoute.cities[i].lat, 
              lng: transitRoute.cities[i].lng 
            };
            const destination = { 
              lat: transitRoute.cities[i + 1].lat, 
              lng: transitRoute.cities[i + 1].lng 
            };
            
            const segmentColor = segmentColors[i % segmentColors.length];
            
            const directionsRenderer = new window.google.maps.DirectionsRenderer({
              map,
              suppressMarkers: false,
              polylineOptions: {
                strokeColor: segmentColor,
                strokeOpacity: 0.8,
                strokeWeight: 5,
              },
            });

            directionsRenderersRef.current.push(directionsRenderer);

            // Request directions with DRIVING mode
            directionsService.route(
              {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK && result) {
                  directionsRenderer.setDirections(result);
                  console.log(`Route segment ${i} (${transitRoute.cities[i].name} → ${transitRoute.cities[i + 1].name}) displayed with color ${segmentColor}`);
                } else {
                  console.error(`Route segment ${i} failed:`, status);
                }
              }
            );
          }
        }

        setIsMapLoaded(true);
      } catch (error) {
        console.error("Failed to initialize map:", error);
      }
    };

    initializeMap();

    return () => {
      isMounted = false;

      // Close any open InfoWindow
      if (currentInfoWindowRef.current) {
        try {
          currentInfoWindowRef.current.close();
        } catch (e) {
          // Ignore errors
        }
        currentInfoWindowRef.current = null;
      }

      // Cleanup markers safely
      markersRef.current.forEach((marker) => {
        try {
          if (marker && marker.map !== null) {
            marker.map = null;
          }
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
      markersRef.current = [];

      // Cleanup polyline
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null);
        } catch (e) {
          // Ignore errors
        }
        polylineRef.current = null;
      }

      // Cleanup directions renderers
      directionsRenderersRef.current.forEach((renderer) => {
        try {
          if (renderer) {
            renderer.setMap(null);
          }
        } catch (e) {
          // Ignore errors
        }
      });
      directionsRenderersRef.current = [];

      // Clear map instance
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }

      // Remove the map div from DOM
      if (
        mapRef.current &&
        containerRef.current &&
        containerRef.current.contains(mapRef.current)
      ) {
        try {
          containerRef.current.removeChild(mapRef.current);
        } catch (e) {
          // Ignore errors if already removed
        }
        mapRef.current = null;
      }
    };
  }, [route, places, transitRoute]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] rounded-lg border border-border overflow-hidden bg-muted relative"
    >
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted z-10">
          Загружаем карту...
        </div>
      )}
    </div>
  );
}