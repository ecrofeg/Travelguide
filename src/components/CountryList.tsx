import { useTranslation } from "react-i18next";
import { CountryGuide } from "../data/mockGuides";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Map, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CountryListProps {
  countries: CountryGuide[];
  onSelectCountry: (country: CountryGuide) => void;
}

export function CountryList({
  countries,
  onSelectCountry,
}: CountryListProps) {
  const { t } = useTranslation();

  const getCityPlural = (count: number) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return t("countries.cities.many");
    }
    if (lastDigit === 1) {
      return t("countries.cities.one");
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return t("countries.cities.few");
    }
    return t("countries.cities.many");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card
              key={country.id}
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => onSelectCountry(country)}
            >
              <div className="relative">
                <ImageWithFallback
                  src="https://storage.yandexcloud.net/travel-guides/images/DDDF1423-399B-4751-B0A0-AE19145CC051_1_105_c.jpeg"
                  alt={country.country}
                  className="w-full h-48 object-cover"
                />
                {country.isPremium && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    <Lock className="w-3 h-3 mr-1" />
                    {t("countries.premium")}
                  </Badge>
                )}
              </div>

              <div className="px-5 pb-5">
                <h3 className="mb-2">{country.country}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {country.description}
                </p>

                <div className="flex items-center gap-1 text-muted-foreground">
                  <Map className="w-4 h-4" />
                  <span>
                    {country.cities.length}{" "}
                    {getCityPlural(country.cities.length)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {countries.length === 0 && (
          <div className="text-center py-16">
            <Map className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="mb-2">
              {t("countries.empty.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("countries.empty.description")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}