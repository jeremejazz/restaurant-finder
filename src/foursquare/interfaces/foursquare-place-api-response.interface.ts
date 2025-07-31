export interface FoursquarePlaceAPIResponse {
  results: FoursquarePlaceDetail[];
}

class FoursquarePlaceDetail {
  name: string;
  categories: { short_name: string; name: string }[];

  location: { formatted_address: string };
  price: number | null;
  rating: number | null;
  hours: { display: string } | null;
  tel: string | null;
  latitude: number;
  longitude: number;
}
