import { ApiProperty } from '@nestjs/swagger';

export class RestaurantResultDetailsDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  cuisine: string[];
  @ApiProperty({ type: String, nullable: true })
  rating: string | null;
  @ApiProperty({ type: String, nullable: true })
  priceLevel: string | null;
  @ApiProperty({ type: String, nullable: true })
  operatingHours: string | null;

  @ApiProperty({ type: String, nullable: true })
  latitude: string | null;
  @ApiProperty({ type: String, nullable: true })
  longitude: string | null;
  @ApiProperty({ type: String, nullable: true })
  tel: string | null;
}

export class RestaurantResultDto {
  @ApiProperty({ type: RestaurantResultDetailsDto, isArray: true })
  data: RestaurantResultDetailsDto[];
}
