import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { GeminiModule } from './gemini/gemini.module';
import { HttpModule } from '@nestjs/axios';
import { FoursquareModule } from './foursquare/foursquare.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantModule,
    GeminiModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    FoursquareModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
