import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Plus, Pencil, Trash2, ArrowLeft, X } from 'lucide-react';
import { CountryGuide, CityGuide } from '../../data/mockGuides';
import { PlaceManager } from './PlaceManager';
import { RoutePointsEditor } from './RoutePointsEditor';
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

interface CityManagerProps {
  country: CountryGuide;
  onBack: () => void;
  onUpdate: (country: CountryGuide) => void;
}

export function CityManager({ country, onBack, onUpdate }: CityManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<CityGuide | null>(null);
  const [managingPlacesFor, setManagingPlacesFor] = useState<CityGuide | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coverImages: [''],
    lat: 0,
    lng: 0,
    route: [] as { lat: number; lng: number }[],
  });

  const handleAdd = () => {
    setEditingCity(null);
    setFormData({
      name: '',
      description: '',
      coverImages: [''],
      lat: 0,
      lng: 0,
      route: [],
    });
    setIsModalOpen(true);
  };

  const handleEdit = (city: CityGuide) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      description: city.description,
      coverImages: city.coverImages,
      lat: city.lat,
      lng: city.lng,
      route: city.route,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const updatedCountry = {
      ...country,
      cities: country.cities.filter(c => c.id !== id),
    };
    onUpdate(updatedCountry);
    toast.success('City deleted successfully');
    setDeleteConfirm(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.description || formData.coverImages.filter(img => img.trim()).length === 0 || !formData.lat || !formData.lng) {
      toast.error('Please fill all required fields including at least one image and coordinates');
      return;
    }

    const cityData = {
      ...formData,
      places: editingCity?.places || [],
    };

    if (editingCity) {
      const updatedCountry = {
        ...country,
        cities: country.cities.map(c => c.id === editingCity.id ? { ...cityData, id: editingCity.id } : c),
      };
      onUpdate(updatedCountry);
      toast.success('City updated successfully');
    } else {
      const newId = `city_${Date.now()}`;
      const updatedCountry = {
        ...country,
        cities: [...country.cities, { ...cityData, id: newId }],
      };
      onUpdate(updatedCountry);
      toast.success('City added successfully');
    }
    setIsModalOpen(false);
  };

  if (managingPlacesFor) {
    return (
      <PlaceManager
        city={managingPlacesFor}
        onBack={() => setManagingPlacesFor(null)}
        onUpdate={(updatedCity) => {
          const updatedCountry = {
            ...country,
            cities: country.cities.map(c => c.id === updatedCity.id ? updatedCity : c),
          };
          onUpdate(updatedCountry);
          setManagingPlacesFor(updatedCity);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Countries
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2>Manage Cities - {country.country}</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add City
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>City Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-20">Places</TableHead>
              <TableHead className="w-32">Route Points</TableHead>
              <TableHead className="w-64">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {country.cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell>{city.id}</TableCell>
                <TableCell>{city.name}</TableCell>
                <TableCell className="max-w-md truncate">{city.description}</TableCell>
                <TableCell>{city.places.length}</TableCell>
                <TableCell>{city.route.length}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(city)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setManagingPlacesFor(city)}>
                      Places
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(city.id)}>
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
            <DialogTitle>{editingCity ? 'Edit City' : 'Add City'}</DialogTitle>
            <DialogDescription>
              {editingCity ? 'Update the city information and route points.' : 'Add a new city to this country guide.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <div>
              <Label htmlFor="name">City Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Tokyo"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the city"
                rows={3}
              />
            </div>

            <div>
              <Label>Cover Images URLs *</Label>
              <div className="space-y-2">
                {formData.coverImages.map((image, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={image}
                      onChange={(e) => {
                        const newImages = [...formData.coverImages];
                        newImages[index] = e.target.value;
                        setFormData({ ...formData, coverImages: newImages });
                      }}
                      placeholder="https://..."
                    />
                    {formData.coverImages.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newImages = formData.coverImages.filter((_, i) => i !== index);
                          setFormData({ ...formData, coverImages: newImages });
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFormData({ ...formData, coverImages: [...formData.coverImages, ''] });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lat">City Latitude *</Label>
                <Input
                  id="lat"
                  type="number"
                  step="any"
                  value={formData.lat}
                  onChange={(e) => setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })}
                  placeholder="e.g., 35.6762"
                />
              </div>
              <div>
                <Label htmlFor="lng">City Longitude *</Label>
                <Input
                  id="lng"
                  type="number"
                  step="any"
                  value={formData.lng}
                  onChange={(e) => setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })}
                  placeholder="e.g., 139.6503"
                />
              </div>
            </div>

            <div>
              <Label>Route Points (Latitude & Longitude)</Label>
              <RoutePointsEditor
                value={formData.route}
                onChange={(route) => setFormData({ ...formData, route })}
              />
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {editingCity ? 'Update' : 'Add'} City
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete City</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this city? This action cannot be undone.
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
