export interface FoursquarePlaceAPIResponse {
  results: FoursquarePlaceDetail[];
}

class FoursquarePlaceDetail {
  name: string;
  categories: { short_name: string }[];

  location: { formatted_address: string };
  price?: number;
  rating?: number;
  hours?: { display: string };
}
