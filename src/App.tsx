import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";
import { CountryList } from "./components/CountryList";
import { CountryDetail } from "./components/CountryDetail";
import { AdminPanel } from "./components/admin/AdminPanel";
import { CountryGuide, CityGuide } from "./data/mockGuides";
import {
  MapIcon,
  Settings,
  Loader2,
  AlertCircle,
  Languages,
} from "lucide-react";

const DATA_URL =
  "https://storage.yandexcloud.net/travel-guides/travel-guides-data.json";

export default function App() {
  const { t, i18n } = useTranslation();
  const [countries, setCountries] = useState<CountryGuide[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryGuide | null>(null);
  const [selectedCity, setSelectedCity] =
    useState<CityGuide | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  // Fetch country data from Yandex Cloud Storage
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(DATA_URL, {
          mode: "cors",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${response.statusText}`,
          );
        }

        const data = await response.json();
        setCountries(data);
        console.log(
          "Successfully loaded data from Yandex Cloud Storage",
        );
      } catch (err) {
        console.error(
          "Failed to fetch from cloud storage:",
          err,
        );
        setError(
          err instanceof Error
            ? err.message
            : "Network error - Failed to fetch travel guides",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Initialize from URL hash on mount and handle hash changes
  useEffect(() => {
    const loadFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      if (hash === "admin") {
        setIsAdminMode(true);
        setSelectedCountry(null);
        setSelectedCity(null);
      } else if (hash.startsWith("country/")) {
        setIsAdminMode(false);
        const countryId = hash.replace("country/", "");
        const country = countries.find(
          (c) => c.id === countryId,
        );
        if (country) {
          setSelectedCountry(country);
        }
      } else {
        setIsAdminMode(false);
        setSelectedCountry(null);
        setSelectedCity(null);
      }
    };

    // Only load from hash if we have countries data
    if (countries.length > 0) {
      loadFromHash();
    }

    // Listen for hash changes
    window.addEventListener("hashchange", loadFromHash);
    return () =>
      window.removeEventListener("hashchange", loadFromHash);
  }, [countries]);

  const handleSelectCountry = (country: CountryGuide) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    window.location.hash = `country/${country.id}`;
  };

  const handleBackToCountries = () => {
    setSelectedCountry(null);
    setSelectedCity(null);
    window.location.hash = "";
  };

  const handleBackToCountry = () => {
    setSelectedCity(null);
  };

  const handleSelectCity = (city: CityGuide) => {
    setSelectedCity(city);
  };

  const handleAdminMode = () => {
    window.location.hash = "admin";
  };

  const handleExitAdmin = () => {
    window.location.hash = "";
  };

  if (isAdminMode) {
    return (
      <AdminPanel
        initialData={countries}
        onExit={handleExitAdmin}
      />
    );
  }

  return (
    <div className="size-full">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToCountries}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity border-0 bg-transparent p-0"
          >
            <MapIcon className="w-6 h-6 text-primary" />
            <h2>{t('app.title')}</h2>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleAdminMode}
              className="hidden flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors border-0 bg-transparent cursor-pointer"
              title="Admin Panel"
            >
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh] gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">
            {t('app.loading')}
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 px-4">
          <AlertCircle className="w-16 h-16 text-destructive" />
          <div className="text-center">
            <h3 className="mb-2">{t('app.error.title')}</h3>
            <p className="text-muted-foreground max-w-md">
              {error}
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {t('app.error.description')}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity border-0 cursor-pointer"
          >
            {t('app.error.retry')}
          </button>
        </div>
      ) : selectedCountry ? (
        <CountryDetail
          country={selectedCountry}
          onBack={handleBackToCountries}
          onSelectCity={handleSelectCity}
        />
      ) : (
        <CountryList
          countries={countries}
          onSelectCountry={handleSelectCountry}
        />
      )}
    </div>
  );
}