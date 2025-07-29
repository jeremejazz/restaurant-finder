export class RestaurantResultDto {
  data: RestaurantResultDetailsDto[];
}

export class RestaurantResultDetailsDto {
  name: string;
  address: string;
  cuisine: string[];
  rating: string | null;
  priceLevel: string | null;
  operatingHours: string | null;
}
