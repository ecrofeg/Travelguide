import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Pencil, Trash2, ArrowLeft } from 'lucide-react';
import { CityGuide, Place } from '../../data/mockGuides';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface PlaceManagerProps {
  city: CityGuide;
  onBack: () => void;
  onUpdate: (city: CityGuide) => void;
}

export function PlaceManager({ city, onBack, onUpdate }: PlaceManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlace, setEditingPlace] = useState<Place | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    annotation: string;
    googleMapsUrl: string;
    lat: number;
    lng: number;
    photos: string;
    category: 'sightseeing' | 'food' | 'coffee';
  }>({
    name: '',
    description: '',
    annotation: '',
    googleMapsUrl: '',
    lat: 0,
    lng: 0,
    photos: '',
    category: 'sightseeing',
  });

  const handleAdd = () => {
    setEditingPlace(null);
    setFormData({
      name: '',
      description: '',
      annotation: '',
      googleMapsUrl: '',
      lat: 0,
      lng: 0,
      photos: '',
      category: 'sightseeing',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (place: Place) => {
    setEditingPlace(place);
    setFormData({
      name: place.name,
      description: place.description,
      annotation: place.annotation,
      googleMapsUrl: place.googleMapsUrl,
      lat: place.lat,
      lng: place.lng,
      photos: place.photos.join('\n'),
      category: place.category,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedCity = {
      ...city,
      places: city.places.filter(p => p.id !== id),
    };
    onUpdate(updatedCity);
    toast.success('Place deleted successfully');
    setDeleteConfirm(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.annotation || !formData.googleMapsUrl || !formData.photos) {
      toast.error('Please fill all required fields');
      return;
    }

    const placeData = {
      ...formData,
      photos: formData.photos.split('\n').filter(url => url.trim()),
    };

    if (editingPlace) {
      const updatedCity = {
        ...city,
        places: city.places.map(p => p.id === editingPlace.id ? { ...placeData, id: editingPlace.id } : p),
      };
      onUpdate(updatedCity);
      toast.success('Place updated successfully');
    } else {
      const newId = `p${Date.now()}`;
      const updatedCity = {
        ...city,
        places: [...city.places, { ...placeData, id: newId }],
      };
      onUpdate(updatedCity);
      toast.success('Place added successfully');
    }
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cities
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2>Manage Places - {city.name}</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Place
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Place Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-32">Category</TableHead>
              <TableHead className="w-40">Coordinates</TableHead>
              <TableHead className="w-20">Photos</TableHead>
              <TableHead className="w-48">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {city.places.map((place) => (
              <TableRow key={place.id}>
                <TableCell>{place.id}</TableCell>
                <TableCell>{place.name}</TableCell>
                <TableCell className="max-w-md truncate">{place.description}</TableCell>
                <TableCell>
                  <Badge variant={
                    place.category === 'sightseeing' ? 'default' : 
                    place.category === 'food' ? 'secondary' : 
                    'outline'
                  }>
                    {place.category}
                  </Badge>
                </TableCell>
                <TableCell>{place.lat.toFixed(4)}, {place.lng.toFixed(4)}</TableCell>
                <TableCell>{place.photos.length}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(place)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(place.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editingPlace ? 'Edit Place' : 'Add Place'}</DialogTitle>
            <DialogDescription>
              {editingPlace ? 'Update the details for this place.' : 'Add a new place to this city guide.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <div className="space-y-2">
              <Label htmlFor="name">Place Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Senso-ji Temple"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description of the place"
                rows={3}
                className="w-full resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annotation">Personal Annotation / Tips *</Label>
              <Textarea
                id="annotation"
                value={formData.annotation}
                onChange={(e) => setFormData({ ...formData, annotation: e.target.value })}
                placeholder="Personal tips and recommendations"
                rows={2}
                className="w-full resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Google Maps URL *</Label>
              <Input
                id="googleMapsUrl"
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                placeholder="https://www.google.com/maps/place/..."
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value: 'sightseeing' | 'food' | 'coffee') => setFormData({ ...formData, category: value })}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sightseeing">Sightseeing</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="coffee">Coffee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lat">Latitude *</Label>
                <Input
                  id="lat"
                  type="number"
                  step="0.000001"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
                  placeholder="35.6762"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lng">Longitude *</Label>
                <Input
                  id="lng"
                  type="number"
                  step="0.000001"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
                  placeholder="139.6503"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photos">Photo URLs (one per line) *</Label>
              <Textarea
                id="photos"
                value={formData.photos}
                onChange={(e) => setFormData({ ...formData, photos: e.target.value })}
                placeholder="Enter image URLs, one per line"
                rows={4}
                className="w-full min-w-0 resize-none break-words"
              />
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {editingPlace ? 'Update' : 'Add'} Place
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Place</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this place? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
