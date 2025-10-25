export interface Place {
  id: string;
  name: string;
  description: string;
  googleMapsUrl: string;
  lat: number;
  lng: number;
  photos: string[];
  annotation: string;
  category: 'sightseeing' | 'food' | 'coffee';
}

export interface CityGuide {
  id: string;
  name: string;
  description: string;
  coverImages: string[];
  lat: number;
  lng: number;
  route: { lat: number; lng: number }[];
  places: Place[];
}

export interface CountryGuide {
  id: string;
  country: string;
  description: string;
  coverImage: string;
  createdAt?: string;
  isPremium: boolean;
  cities: CityGuide[];
}

export const mockCountryGuides: CountryGuide[] = [
  {
    "country": "Kekekoko",
    "description": "Explore the perfect blend of ancient traditions and cutting-edge modernity across Japan's most iconic cities.",
    "coverImage": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbiUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjAxOTczODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "createdAt": "2025-10-01",
    "isPremium": false,
    "cities": [
      {
        "id": "tokyo",
        "name": "Tokyo",
        "description": "A perfect blend of traditional temples and modern city life. This guide covers the best spots in Tokyo for first-time visitors.",
        "coverImages": [
          "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNreWxpbmV8ZW58MXx8fHwxNzYwMTk2Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1645343709881-465be60137a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNreWxpbmUlMjBuaWdodHxlbnwxfHx8fDE3NjEzODYzNDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1728487908112-cd342e50b50f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc2MTM4NjM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        "lat": 35.6762,
        "lng": 139.6503,
        "route": [
          {
            "lat": 35.6762,
            "lng": 139.6503
          },
          {
            "lat": 35.6586,
            "lng": 139.7454
          },
          {
            "lat": 35.6595,
            "lng": 139.7004
          }
        ],
        "places": [
          {
            "id": "p1",
            "name": "Senso-ji Temple",
            "description": "Tokyo's oldest temple with stunning architecture and the famous Kaminarimon Gate.",
            "googleMapsUrl": "https://www.google.com/maps/place/Senso-ji/@35.7147651,139.7945034,17z",
            "lat": 35.7148,
            "lng": 139.7967,
            "photos": [
              "https://images.unsplash.com/photo-1578592439618-cbe39942ff0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZXxlbnwxfHx8fDE3NjAxOTY2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Visit early morning (7-8 AM) to avoid crowds. Don't miss the shopping street Nakamise-dori leading to the temple!",
            "category": "sightseeing"
          },
          {
            "id": "p2",
            "name": "Shibuya Crossing",
            "description": "The world's busiest pedestrian crossing and an iconic Tokyo landmark.",
            "googleMapsUrl": "https://www.google.com/maps/place/Shibuya+Crossing/@35.6595,139.7004,17z",
            "lat": 35.6595,
            "lng": 139.7004,
            "photos": [
              "https://images.unsplash.com/photo-1549693578-d683be217e58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNoaWJ1eWF8ZW58MXx8fHwxNzYwMTk2Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Best viewed from Starbucks on the 2nd floor of Tsutaya. Visit at night for amazing neon lights!",
            "category": "sightseeing"
          },
          {
            "id": "p2b",
            "name": "Ichiran Ramen Shibuya",
            "description": "Famous solo-dining ramen chain known for their rich tonkotsu broth and customizable ordering system.",
            "googleMapsUrl": "https://www.google.com/maps/place/Ichiran+Ramen/@35.6595,139.7004,17z",
            "lat": 35.66,
            "lng": 139.7008,
            "photos": [
              "https://images.unsplash.com/photo-1557872943-16a5ac26437e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGphcGFufGVufDB8fHx8MTcyOTUzNjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Open 24/7! Use the vending machine to order, then customize your ramen preferences on the order form.",
            "category": "food"
          },
          {
            "id": "p3",
            "name": "Shinjuku District",
            "description": "A vibrant district known for shopping, entertainment, and nightlife.",
            "googleMapsUrl": "https://www.google.com/maps/place/Shinjuku,+Tokyo/@35.6938,139.7034,14z",
            "lat": 35.6938,
            "lng": 139.7034,
            "photos": [
              "https://images.unsplash.com/photo-1679097844800-b0cb637306ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMGphcGFufGVufDF8fHx8MTc2MDE3OTMxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Explore the Golden Gai area for tiny bars and unique atmosphere. Try authentic ramen at one of the many shops.",
            "category": "sightseeing"
          },
          {
            "id": "p3b",
            "name": "Blue Bottle Coffee Shinjuku",
            "description": "Minimalist coffee shop serving expertly crafted pour-over coffee and espresso drinks.",
            "googleMapsUrl": "https://www.google.com/maps/place/Blue+Bottle+Coffee/@35.6910,139.7020,17z",
            "lat": 35.691,
            "lng": 139.702,
            "photos": [
              "https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTcyOTUzNjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Try their New Orleans-style iced coffee. Great spot for a morning caffeine fix before exploring the city.",
            "category": "coffee"
          }
        ]
      },
      {
        "id": "kyoto",
        "name": "Kyoto",
        "description": "The cultural heart of Japan with over 2,000 temples and shrines, traditional tea houses, and beautiful gardens.",
        "coverImages": [
          "https://images.unsplash.com/photo-1614360380098-63e2fbfda70b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMHRlbXBsZXxlbnwxfHx8fDE3NjAxMzE1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1649451899802-b455e613bcef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMHRlbXBsZSUyMGdhcmRlbnxlbnwxfHx8fDE3NjEzODYzNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1649009792206-d8ddb5e18914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMGJhbWJvbyUyMGZvcmVzdHxlbnwxfHx8fDE3NjEyOTE2NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        "lat": 35.0116,
        "lng": 135.7681,
        "route": [
          {
            "lat": 35.0116,
            "lng": 135.7681
          },
          {
            "lat": 35.0394,
            "lng": 135.7292
          },
          {
            "lat": 35.027,
            "lng": 135.7818
          }
        ],
        "places": [
          {
            "id": "p4",
            "name": "Fushimi Inari Shrine",
            "description": "Famous for its thousands of vermillion torii gates that wind through the wooded forest.",
            "googleMapsUrl": "https://www.google.com/maps/place/Fushimi+Inari+Taisha/@35.0116,135.7681,17z",
            "lat": 35.0116,
            "lng": 135.7681,
            "photos": [
              "https://images.unsplash.com/photo-1614360380098-63e2fbfda70b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMHRlbXBsZXxlbnwxfHx8fDE3NjAxMzE1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Start early to beat the crowds. The hike to the top takes about 2 hours but you can turn back anytime.",
            "category": "sightseeing"
          },
          {
            "id": "p5",
            "name": "Kinkaku-ji (Golden Pavilion)",
            "description": "A Zen Buddhist temple covered in gold leaf, surrounded by beautiful gardens and a reflective pond.",
            "googleMapsUrl": "https://www.google.com/maps/place/Kinkaku-ji/@35.0394,135.7292,17z",
            "lat": 35.0394,
            "lng": 135.7292,
            "photos": [
              "https://images.unsplash.com/photo-1614360380098-63e2fbfda70b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxreW90byUyMHRlbXBsZXxlbnwxfHx8fDE3NjAxMzE1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Best photographed in the morning when the light hits the pavilion perfectly.",
            "category": "sightseeing"
          },
          {
            "id": "p5b",
            "name": "Nishiki Market",
            "description": "Known as \"Kyoto's Kitchen\", this narrow shopping street is packed with food stalls and specialty shops.",
            "googleMapsUrl": "https://www.google.com/maps/place/Nishiki+Market/@35.0050,135.7661,17z",
            "lat": 35.005,
            "lng": 135.7661,
            "photos": [
              "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMG1hcmtldHxlbnwwfHx8fDE3Mjk1MzY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Try fresh seafood, pickles, and local delicacies. Go hungry and sample as you walk!",
            "category": "food"
          },
          {
            "id": "p5c",
            "name": "% Arabica Kyoto",
            "description": "Scenic coffee shop with views of the Higashiyama mountains, known for latte art and quality beans.",
            "googleMapsUrl": "https://www.google.com/maps/place/%25+Arabica+Kyoto/@35.0033,135.7810,17z",
            "lat": 35.0033,
            "lng": 135.781,
            "photos": [
              "https://images.unsplash.com/photo-1442512595331-e89e73853f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwwfHx8fDE3Mjk1MzY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Perfect location by the river. Get there early to avoid long queues, especially on weekends.",
            "category": "coffee"
          }
        ]
      },
      {
        "id": "osaka",
        "name": "Osaka",
        "description": "Japan's kitchen - a vibrant city known for incredible street food, historic castles, and lively nightlife.",
        "coverImages": [
          "https://images.unsplash.com/photo-1580138051672-325eb98b2749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMGNhc3RsZXxlbnwxfHx8fDE3NjAxOTczODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1583070387404-71e2c4e4a919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NjEzODYzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1753736541422-e49e6e40848c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzYxMjc5OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        "lat": 34.6937,
        "lng": 135.5023,
        "route": [
          {
            "lat": 34.6937,
            "lng": 135.5023
          },
          {
            "lat": 34.6686,
            "lng": 135.502
          }
        ],
        "places": [
          {
            "id": "p6",
            "name": "Osaka Castle",
            "description": "A magnificent castle with beautiful grounds and a museum showcasing the history of Osaka.",
            "googleMapsUrl": "https://www.google.com/maps/place/Osaka+Castle/@34.6937,135.5023,17z",
            "lat": 34.6937,
            "lng": 135.5023,
            "photos": [
              "https://images.unsplash.com/photo-1580138051672-325eb98b2749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMGNhc3RsZXxlbnwxfHx8fDE3NjAxOTczODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Visit during cherry blossom season for an unforgettable experience. The castle is stunning at sunset!",
            "category": "sightseeing"
          },
          {
            "id": "p7",
            "name": "Dotonbori",
            "description": "The heart of Osaka's entertainment district with neon lights, street food, and the famous Glico Running Man sign.",
            "googleMapsUrl": "https://www.google.com/maps/place/Dotonbori/@34.6686,135.5020,17z",
            "lat": 34.6686,
            "lng": 135.502,
            "photos": [
              "https://images.unsplash.com/photo-1580138051672-325eb98b2749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvc2FrYSUyMGNhc3RsZXxlbnwxfHx8fDE3NjAxOTczODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Must try: takoyaki and okonomiyaki! The area is most vibrant in the evening.",
            "category": "sightseeing"
          },
          {
            "id": "p7b",
            "name": "Takoyaki Wanaka",
            "description": "Legendary takoyaki stand serving crispy-on-the-outside, creamy-on-the-inside octopus balls since 1961.",
            "googleMapsUrl": "https://www.google.com/maps/place/Takoyaki+Wanaka/@34.6683,135.5018,17z",
            "lat": 34.6683,
            "lng": 135.5018,
            "photos": [
              "https://images.unsplash.com/photo-1606728035253-49e8a23146de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWtveWFraXxlbnwwfHx8fDE3Mjk1MzY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Always a queue but it moves fast. Get the original flavor to taste the authentic recipe!",
            "category": "food"
          }
        ]
      }
    ],
    "id": "1"
  },
  {
    "id": "2",
    "country": "Italy",
    "description": "Experience the romance, art, and culinary delights of Italy's most enchanting cities.",
    "coverImage": "https://images.unsplash.com/photo-1568282167464-cb0d811b05c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFseSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NjAxOTczODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "createdAt": "2025-09-15",
    "isPremium": true,
    "cities": [
      {
        "id": "rome",
        "name": "Rome",
        "description": "The Eternal City - where ancient history meets modern Italian life at every corner.",
        "coverImages": [
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtfGVufDF8fHx8MTc2MDEwODIxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1699361233748-83d72473e5c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwYXJjaGl0ZWN0dXJlJTIwaGlzdG9yaWN8ZW58MXx8fHwxNzYxMzg2MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1621969063511-ac1499fb8b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwc3RyZWV0JTIwdmlld3xlbnwxfHx8fDE3NjEzODYzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        "lat": 41.9028,
        "lng": 12.4964,
        "route": [
          {
            "lat": 41.8902,
            "lng": 12.4922
          },
          {
            "lat": 41.9009,
            "lng": 12.4833
          }
        ],
        "places": [
          {
            "id": "p8",
            "name": "Colosseum",
            "description": "The iconic ancient amphitheater and one of the most impressive monuments of Roman architecture.",
            "googleMapsUrl": "https://www.google.com/maps/place/Colosseum/@41.8902,12.4922,17z",
            "lat": 41.8902,
            "lng": 12.4922,
            "photos": [
              "https://images.unsplash.com/photo-1552832230-c0197dd311b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwY29sb3NzZXVtfGVufDF8fHx8MTc2MDEwODIxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Book tickets online in advance to skip the long queues. Early morning visits are best!",
            "category": "sightseeing"
          },
          {
            "id": "p8b",
            "name": "Trattoria Da Enzo",
            "description": "Beloved family-run trattoria in Trastevere serving authentic Roman cuisine.",
            "googleMapsUrl": "https://www.google.com/maps/place/Trattoria+Da+Enzo/@41.8891,12.4692,17z",
            "lat": 41.8891,
            "lng": 12.4692,
            "photos": [
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZm9vZHxlbnwwfHx8fDE3Mjk1MzY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "No reservations - arrive early! Try the carbonara and cacio e pepe. Cash only!",
            "category": "food"
          },
          {
            "id": "p8c",
            "name": "Sant'Eustachio Il Caffè",
            "description": "Historic Roman coffee bar famous for their secret espresso blend and Gran Caffè.",
            "googleMapsUrl": "https://www.google.com/maps/place/Sant'Eustachio+Il+Caffè/@41.8988,12.4752,17z",
            "lat": 41.8988,
            "lng": 12.4752,
            "photos": [
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzb3xlbnwwfHx8fDE3Mjk1MzY3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Stand at the bar like a local. The coffee is pre-sweetened - ask for \"amaro\" if you want it unsweetened.",
            "category": "coffee"
          }
        ]
      },
      {
        "id": "venice",
        "name": "Venice",
        "description": "A magical floating city of canals, bridges, and stunning architecture.",
        "coverImages": [
          "https://images.unsplash.com/photo-1727001498963-4e26598dc486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5pY2UlMjBjYW5hbHN8ZW58MXx8fHwxNzYwMTk3Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1643444313954-fe3a6a8b835d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5pY2UlMjBnb25kb2xhJTIwY2FuYWx8ZW58MXx8fHwxNzYxMzE1OTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          "https://images.unsplash.com/photo-1709226751884-645027363217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5pY2UlMjBhcmNoaXRlY3R1cmUlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjEzODYzNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        ],
        "lat": 45.4408,
        "lng": 12.3155,
        "route": [
          {
            "lat": 45.4408,
            "lng": 12.3155
          },
          {
            "lat": 45.4384,
            "lng": 12.3351
          }
        ],
        "places": [
          {
            "id": "p9",
            "name": "St. Mark's Square",
            "description": "Venice's principal public square, surrounded by stunning Byzantine architecture.",
            "googleMapsUrl": "https://www.google.com/maps/place/St.+Mark's+Square/@45.4408,12.3155,17z",
            "lat": 45.4408,
            "lng": 12.3155,
            "photos": [
              "https://images.unsplash.com/photo-1727001498963-4e26598dc486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW5pY2UlMjBjYW5hbHN8ZW58MXx8fHwxNzYwMTk3Mzg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            ],
            "annotation": "Visit early morning to enjoy the square without the crowds. Don't miss the view from the Campanile!",
            "category": "sightseeing"
          },
          {
            "id": "p9b",
            "name": "Osteria alle Testiere",
            "description": "Tiny, intimate seafood restaurant known for the freshest fish and Venetian specialties.",
            "googleMapsUrl": "https://www.google.com/maps/place/Osteria+alle+Testiere/@45.4385,12.3421,17z",
            "lat": 45.4385,
            "lng": 12.3421,
            "photos": [
              "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdGVyfGVufDB8fHx8MTcyOTUzNjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Reservations essential - book weeks in advance! Let them guide your menu choices.",
            "category": "food"
          },
          {
            "id": "p9c",
            "name": "Caffè Florian",
            "description": "Venice's oldest coffee house (since 1720) in St. Mark's Square with live orchestra music.",
            "googleMapsUrl": "https://www.google.com/maps/place/Caffè+Florian/@45.4337,12.3384,17z",
            "lat": 45.4337,
            "lng": 12.3384,
            "photos": [
              "https://images.unsplash.com/photo-1511920170033-f8396924c348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTcyOTUzNjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            ],
            "annotation": "Expensive but worth it for the experience. Sit outside for the orchestra, inside for historic interiors.",
            "category": "coffee"
          }
        ]
      }
    ]
  }
];
