import { Module } from '@nestjs/common';
import { FoursquareService } from './foursquare.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FoursquareService],
  exports: [FoursquareService],
})
export class FoursquareModule {}
