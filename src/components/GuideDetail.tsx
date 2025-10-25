import { ArrowLeft, Calendar, Lock } from 'lucide-react';
import { TravelGuide } from '../data/mockGuides';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { TravelMap } from './TravelMap';
import { PlacesList } from './PlacesList';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GuideDetailProps {
  guide: TravelGuide;
  onBack: () => void;
}

export function GuideDetail({ guide, onBack }: GuideDetailProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <div className="mb-8">
          <div className="relative mb-4">
            <ImageWithFallback
              src={guide.coverImage}
              alt={guide.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            {guide.isPremium && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                <Lock className="w-3 h-3 mr-1" />
                Для избранных
              </Badge>
            )}
          </div>
          
          <h1 className="mb-2">{guide.title}</h1>
          
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>{new Date(guide.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <p className="text-muted-foreground">{guide.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="mb-4">Маршрут</h2>
          <TravelMap 
            route={guide.route} 
            places={guide.places.map(p => ({ 
              id: p.id, 
              name: p.name, 
              lat: p.lat, 
              lng: p.lng 
            }))} 
          />
        </div>

        <div>
          <h2 className="mb-4">Че поглядеть?</h2>
          <PlacesList places={guide.places} />
        </div>
      </div>
    </div>
  );
}
