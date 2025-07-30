import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RestaurantSearchDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiProperty({
    description: 'Message prompt for LLM',
    maximum: 400,
  })
  message: string;

  @ApiProperty({
    description: 'API Key',
  })
  code: string;
}
