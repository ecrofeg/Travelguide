import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface RoutePoint {
  lat: number;
  lng: number;
}

interface RoutePointsEditorProps {
  value: RoutePoint[];
  onChange: (value: RoutePoint[]) => void;
}

export function RoutePointsEditor({ value, onChange }: RoutePointsEditorProps) {
  const handleAdd = () => {
    onChange([...value, { lat: 0, lng: 0 }]);
  };

  const handleDelete = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: 'lat' | 'lng', val: string) => {
    const newValue = [...value];
    newValue[index] = { ...newValue[index], [field]: parseFloat(val) || 0 };
    onChange(newValue);
  };

  return (
    <div className="space-y-3 mt-2">
      {value.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
          <span className="text-muted-foreground min-w-[80px]">Point {index + 1}:</span>
          <Input
            type="number"
            step="0.000001"
            placeholder="Latitude"
            value={item.lat}
            onChange={(e) => handleChange(index, 'lat', e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            step="0.000001"
            placeholder="Longitude"
            value={item.lng}
            onChange={(e) => handleChange(index, 'lng', e.target.value)}
            className="flex-1"
          />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleDelete(index)}
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button 
        type="button"
        variant="outline" 
        onClick={handleAdd}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Route Point
      </Button>
    </div>
  );
}
