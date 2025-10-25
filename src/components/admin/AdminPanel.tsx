import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Download, Upload, Home, Globe, Map, MapPin } from 'lucide-react';
import { CountryGuide, CityGuide } from '../../data/mockGuides';
import { CountryManager } from './CountryManager';
import { CityManager } from './CityManager';
import { PlaceManager } from './PlaceManager';
import { toast } from 'sonner@2.0.3';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface AdminPanelProps {
  initialData: CountryGuide[];
  onExit: () => void;
}

export function AdminPanel({ initialData, onExit }: AdminPanelProps) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<CountryGuide[]>(initialData);
  const [selectedMenu, setSelectedMenu] = useState<'countries' | 'cities' | 'places'>('countries');
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');
  const [selectedCityId, setSelectedCityId] = useState<string>('');

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(countries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'travel-guides-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(t('admin.toast.exportSuccess'));
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target?.result as string);
            setCountries(jsonData);
            toast.success(t('admin.toast.importSuccess'));
          } catch (error) {
            toast.error(t('admin.toast.importError'));
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="flex items-center gap-2">
            {t('admin.panel')}
          </h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleImportJSON}>
              <Upload className="w-4 h-4 mr-2" />
              {t('admin.import')}
            </Button>
            <Button variant="default" size="sm" onClick={handleExportJSON}>
              <Download className="w-4 h-4 mr-2" />
              {t('admin.export')}
            </Button>
            <Button variant="secondary" size="sm" onClick={onExit}>
              <Home className="w-4 h-4 mr-2" />
              {t('admin.exitAdmin')}
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Button
              variant={selectedMenu === 'countries' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedMenu('countries')}
            >
              <Globe className="w-4 h-4 mr-2" />
              {t('admin.countries')}
            </Button>
            <Button
              variant={selectedMenu === 'cities' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedMenu('cities')}
            >
              <Map className="w-4 h-4 mr-2" />
              {t('admin.cities')}
            </Button>
            <Button
              variant={selectedMenu === 'places' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedMenu('places')}
            >
              <MapPin className="w-4 h-4 mr-2" />
              {t('admin.places')}
            </Button>
          </nav>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedMenu === 'countries' && (
            <CountryManager 
              countries={countries} 
              onChange={setCountries}
            />
          )}
          
          {selectedMenu === 'cities' && (
            <div>
              <div className="mb-6">
                <h2 className="mb-4">{t('admin.cities')}</h2>
                <div className="max-w-md">
                  <label className="block mb-2 text-muted-foreground">{t('admin.selectCountry')}:</label>
                  <Select value={selectedCountryId} onValueChange={setSelectedCountryId}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('admin.selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.id}>
                          {country.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {selectedCountryId && (() => {
                const country = countries.find(c => c.id === selectedCountryId);
                return country ? (
                  <CityManager
                    country={country}
                    onBack={() => setSelectedCountryId('')}
                    onUpdate={(updatedCountry) => {
                      setCountries(countries.map(c => c.id === updatedCountry.id ? updatedCountry : c));
                    }}
                  />
                ) : null;
              })()}
            </div>
          )}
          
          {selectedMenu === 'places' && (
            <div>
              <div className="mb-6">
                <h2 className="mb-4">{t('admin.places')}</h2>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block mb-2 text-muted-foreground">{t('admin.selectCountry')}:</label>
                    <Select value={selectedCountryId} onValueChange={(value) => {
                      setSelectedCountryId(value);
                      setSelectedCityId('');
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('admin.selectCountry')} />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedCountryId && (() => {
                    const country = countries.find(c => c.id === selectedCountryId);
                    return country && country.cities.length > 0 ? (
                      <div>
                        <label className="block mb-2 text-muted-foreground">{t('admin.selectCity')}:</label>
                        <Select value={selectedCityId} onValueChange={setSelectedCityId}>
                          <SelectTrigger>
                            <SelectValue placeholder={t('admin.selectCity')} />
                          </SelectTrigger>
                          <SelectContent>
                            {country.cities.map((city) => (
                              <SelectItem key={city.id} value={city.id}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : country ? (
                      <p className="text-muted-foreground text-sm">{t('admin.noCities')}</p>
                    ) : null;
                  })()}
                </div>
              </div>
              
              {selectedCountryId && selectedCityId && (() => {
                const country = countries.find(c => c.id === selectedCountryId);
                const city = country?.cities.find(c => c.id === selectedCityId);
                return country && city ? (
                  <PlaceManager
                    city={city}
                    onBack={() => setSelectedCityId('')}
                    onUpdate={(updatedCity) => {
                      const updatedCountry = {
                        ...country,
                        cities: country.cities.map(c => c.id === updatedCity.id ? updatedCity : c)
                      };
                      setCountries(countries.map(c => c.id === updatedCountry.id ? updatedCountry : c));
                    }}
                  />
                ) : null;
              })()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
