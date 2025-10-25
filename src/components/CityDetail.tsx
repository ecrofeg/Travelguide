import { ArrowLeft } from "lucide-react";
import { CityGuide } from "../data/mockGuides";
import { Button } from "./ui/button";
import { TravelMap } from "./TravelMap";
import { PlacesList } from "./PlacesList";
import { ImageCarousel } from "./ImageCarousel";

interface CityDetailProps {
  city: CityGuide;
  countryName: string;
  onBack: () => void;
}

export function CityDetail({
  city,
  countryName,
  onBack,
}: CityDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="mb-8">
          <div className="mb-4">
            <ImageCarousel
              images={city.coverImages || []}
              alt={city.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <h1 className="mb-2">{city.name}</h1>

          <p className="text-muted-foreground">
            {city.description}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4">Маршрут</h2>
          <TravelMap
            route={city.route}
            places={city.places.map((p) => ({
              id: p.id,
              name: p.name,
              lat: p.lat,
              lng: p.lng,
            }))}
          />
        </div>

        <div>
          <h2 className="mb-4">Че посетить?</h2>
          <PlacesList places={city.places} />
        </div>
      </div>
    </div>
  );
}