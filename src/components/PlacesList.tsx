import { useTranslation } from "react-i18next";
import { MapPin, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Place {
  id: string;
  name: string;
  description: string;
  googleMapsUrl: string;
  photos: string[];
  annotation: string;
}

interface PlacesListProps {
  places: Place[];
}

export function PlacesList({ places }: PlacesListProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      {places.map((place) => (
        <Card key={place.id} className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3>{place.name}</h3>
                <a
                  href={place.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline flex-shrink-0"
                >
                  {t('places.openOnMaps')}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-muted-foreground mb-3">
                {place.description}
              </p>

              {place.photos && place.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                  {place.photos.map((photo, idx) => (
                    <ImageWithFallback
                      key={idx}
                      src={photo}
                      alt={`${place.name} photo ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              )}

              {place.annotation && (
                <div className="bg-accent/50 p-4 rounded-md border-l-4 border-primary">
                  <Badge className="mb-2">{t('places.comment')}</Badge>
                  <p className="text-accent-foreground">
                    {place.annotation}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}