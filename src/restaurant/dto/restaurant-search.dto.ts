import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RestaurantSearchDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  message: string;
}
