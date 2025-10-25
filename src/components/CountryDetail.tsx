import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Lock,
  MapPin,
  ChevronDown,
  Coffee,
  UtensilsCrossed,
  Landmark,
} from "lucide-react";
import { CountryGuide, CityGuide } from "../data/mockGuides";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { TravelMap } from "./TravelMap";
import { PlacesList } from "./PlacesList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { ImageCarousel } from "./ImageCarousel";

interface CountryDetailProps {
  country: CountryGuide;
  onBack: () => void;
  onSelectCity: (city: CityGuide) => void;
}

export function CountryDetail({
  country,
  onBack,
  onSelectCity,
}: CountryDetailProps) {
  const { t } = useTranslation();
  
  // Track which cities are expanded (all expanded by default)
  const [openCities, setOpenCities] = useState<Set<string>>(
    new Set(country.cities.map((city) => city.id)),
  );

  const toggleCity = (cityId: string) => {
    setOpenCities((prev) => {
      const next = new Set(prev);
      if (next.has(cityId)) {
        next.delete(cityId);
      } else {
        next.add(cityId);
      }
      return next;
    });
  };

  // Memoize country-level map data to prevent re-rendering when accordion state changes
  const countryMapPlaces = useMemo(
    () =>
      country.cities.flatMap((city) =>
        city.places.map((place) => ({
          id: `${city.id}-${place.id}`,
          name: `${place.name} (${city.name})`,
          lat: place.lat,
          lng: place.lng,
          category: place.category,
          photos: place.photos,
        })),
      ),
    [country.cities],
  );

  const countryMapTransitRoute = useMemo(
    () => ({
      cities: country.cities.map((city) => ({
        name: city.name,
        lat: city.lat,
        lng: city.lng,
      })),
    }),
    [country.cities],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('countries.backButton')}
        </Button>

        <div className="mb-8">
          <h1 className="mb-2">{country.country}</h1>
          <p className="text-muted-foreground mb-6">
            {country.description}
          </p>

          <TravelMap
            route={[]}
            places={countryMapPlaces}
            transitRoute={countryMapTransitRoute}
          />
        </div>

        <div>
          <div className="space-y-6">
            {country.cities.map((city) => (
              <Collapsible
                key={city.id}
                open={openCities.has(city.id)}
                onOpenChange={() => toggleCity(city.id)}
                className="border-t border-border pt-6 first:border-t-0 first:pt-0"
              >
                <CollapsibleTrigger className="w-full group">
                  <div className="flex items-center justify-between mb-6 cursor-pointer">
                    <h1 className="text-left">{city.name}</h1>
                    <ChevronDown className="w-6 h-6 transition-transform group-data-[state=open]:rotate-180" />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mb-6">
                    <div className="mb-4">
                      <ImageCarousel
                        images={city.coverImages || []}
                        alt={city.name}
                        className="w-full max-h-[1100px] object-cover rounded-lg"
                      />
                    </div>

                    <p className="text-muted-foreground bg-muted/50 border-l-4 border-primary p-4 rounded-md">
                      {city.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <TravelMap
                      route={city.route}
                      places={city.places.map((p) => ({
                        id: p.id,
                        name: p.name,
                        lat: p.lat,
                        lng: p.lng,
                        category: p.category,
                        photos: p.photos,
                      }))}
                    />
                  </div>

                  <div>
                    <Tabs
                      defaultValue="sightseeing"
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger
                          value="sightseeing"
                          className="flex items-center gap-2"
                        >
                          <Landmark className="w-4 h-4" />
                          {t('categories.sightseeing')}
                        </TabsTrigger>
                        <TabsTrigger
                          value="food"
                          className="flex items-center gap-2"
                        >
                          <UtensilsCrossed className="w-4 h-4" />
                          {t('categories.food')}
                        </TabsTrigger>
                        <TabsTrigger
                          value="coffee"
                          className="flex items-center gap-2"
                        >
                          <Coffee className="w-4 h-4" />
                          {t('categories.coffee')}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="sightseeing">
                        <PlacesList
                          places={city.places.filter(
                            (p) => p.category === "sightseeing",
                          )}
                        />
                      </TabsContent>

                      <TabsContent value="food">
                        <PlacesList
                          places={city.places.filter(
                            (p) => p.category === "food",
                          )}
                        />
                      </TabsContent>

                      <TabsContent value="coffee">
                        <PlacesList
                          places={city.places.filter(
                            (p) => p.category === "coffee",
                          )}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}