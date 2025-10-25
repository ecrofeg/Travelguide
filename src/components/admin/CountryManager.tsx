import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { CountryGuide } from '../../data/mockGuides';
import { CityManager } from './CityManager';
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

interface CountryManagerProps {
  countries: CountryGuide[];
  onChange: (countries: CountryGuide[]) => void;
}

export function CountryManager({ countries, onChange }: CountryManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<CountryGuide | null>(null);
  const [managingCitiesFor, setManagingCitiesFor] = useState<CountryGuide | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    country: '',
    description: '',
    coverImage: '',
    isPremium: false,
  });

  const handleAdd = () => {
    setEditingCountry(null);
    setFormData({
      country: '',
      description: '',
      coverImage: '',
      isPremium: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (country: CountryGuide) => {
    setEditingCountry(country);
    setFormData({
      country: country.country,
      description: country.description,
      coverImage: country.coverImage,
      isPremium: country.isPremium,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    onChange(countries.filter(c => c.id !== id));
    toast.success('Country deleted successfully');
    setDeleteConfirm(null);
  };

  const handleSubmit = () => {
    if (!formData.country || !formData.description || !formData.coverImage) {
      toast.error('Please fill all required fields');
      return;
    }

    const countryData = {
      ...formData,
      cities: editingCountry?.cities || [],
    };

    if (editingCountry) {
      onChange(countries.map(c => c.id === editingCountry.id ? { ...countryData, id: editingCountry.id } : c));
      toast.success('Country updated successfully');
    } else {
      const newId = String(Math.max(...countries.map(c => parseInt(c.id)), 0) + 1);
      onChange([...countries, { ...countryData, id: newId }]);
      toast.success('Country added successfully');
    }
    setIsModalOpen(false);
  };

  if (managingCitiesFor) {
    return (
      <CityManager
        country={managingCitiesFor}
        onBack={() => setManagingCitiesFor(null)}
        onUpdate={(updatedCountry) => {
          onChange(countries.map(c => c.id === updatedCountry.id ? updatedCountry : c));
          setManagingCitiesFor(updatedCountry);
        }}
      />
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2>Manage Countries</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Country
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-20">Cities</TableHead>
              <TableHead className="w-24">Premium</TableHead>
              <TableHead className="w-64">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries.map((country) => (
              <TableRow key={country.id}>
                <TableCell>{country.id}</TableCell>
                <TableCell>{country.country}</TableCell>
                <TableCell className="max-w-md truncate">{country.description}</TableCell>
                <TableCell>{country.cities.length}</TableCell>
                <TableCell>{country.isPremium ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(country)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setManagingCitiesFor(country)}>
                      Cities
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(country.id)}>
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
        <DialogContent className="max-w-2xl overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>{editingCountry ? 'Edit Country' : 'Add Country'}</DialogTitle>
            <DialogDescription>
              {editingCountry ? 'Update the details for this country guide.' : 'Create a new country guide.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="country">Country Name *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="e.g., Japan"
              />
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the country guide"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="coverImage">Cover Image URL *</Label>
              <Input
                id="coverImage"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="isPremium"
                checked={formData.isPremium}
                onCheckedChange={(checked) => setFormData({ ...formData, isPremium: checked })}
              />
              <Label htmlFor="isPremium">Premium Content</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>
              {editingCountry ? 'Update' : 'Add'} Country
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Country</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this country? This action cannot be undone.
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
