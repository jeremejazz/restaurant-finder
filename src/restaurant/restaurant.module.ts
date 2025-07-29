import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { GeminiModule } from '../gemini/gemini.module';
import { FoursquareModule } from '../foursquare/foursquare.module';

@Module({
  imports: [GeminiModule, FoursquareModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
