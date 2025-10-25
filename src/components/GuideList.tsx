import { TravelGuide } from '../data/mockGuides';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, MapPin, Lock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GuideListProps {
  guides: TravelGuide[];
  onSelectGuide: (guide: TravelGuide) => void;
}

export function GuideList({ guides, onSelectGuide }: GuideListProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">My Travel Guides</h1>
          <p className="text-muted-foreground">
            Explore detailed travel routes, places to visit, and personal tips from my adventures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card
              key={guide.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectGuide(guide)}
            >
              <div className="relative">
                <ImageWithFallback
                  src={guide.coverImage}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                {guide.isPremium && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    <Lock className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              
              <div className="p-5">
                <h3 className="mb-2">{guide.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {guide.description}
                </p>
                
                <div className="flex items-center justify-between text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{guide.places.length} places</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {guides.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="mb-2">No guides yet</h2>
            <p className="text-muted-foreground">
              Start creating your first travel guide to share with friends
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
