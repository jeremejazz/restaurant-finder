/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import {
  RestaurantResultDetailsDto,
  RestaurantResultDto,
} from './dto/restaurant-result.dto';
import { LLMQueryResult } from './interfaces/llm-query-result.interface';
import { FoursquareService } from '../foursquare/foursquare.service';
import { FoursquareSearchPlace } from '../foursquare/interfaces/foursquare-search-place.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RestaurantService {
  constructor(
    protected readonly geminiService: GeminiService,
    protected readonly fourSquareService: FoursquareService,
    protected readonly configService: ConfigService,
  ) {}
  async search(message: string): Promise<RestaurantResultDto> {
    const queryData = await this.requestGemini(message);

    const placeSearchResult = await this.requestFoursquare(queryData);
    // FourSquare API Request

    return {
      data: placeSearchResult,
    };
  }
  async requestGemini(message: string) {
    const config = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          parameters: {
            type: 'OBJECT',
            properties: {
              query: {
                type: 'STRING',
                description:
                  'A string to be matched against all content for this place, including but not limited to venue name, category, telephone number, taste, and tips.',
              },
              near: {
                type: 'STRING',
                description: 'A string naming a locality in the world',
              },
              min_price: {
                type: 'INTEGER',
                description:
                  'Minimum Price. where 1 is most affordable and 4 is most expensive, inclusive.',
                minimum: 1,
                maximum: 4,
              },
              max_price: {
                type: 'INTEGER',
                description:
                  'Maximum Price. where 1 is most affordable and 4 is most expensive, inclusive.',
                minimum: 1,
                maximum: 4,
              },
              open_now: {
                type: 'BOOLEAN',
                description:
                  'If establishment is specified to be open or closed',
              },
              rating: {
                type: 'INTEGER',
                description: 'rating of the restaurant.',
                minimum: 0,
                maximum: 10,
              },
            },
          },
        },
      },
    };

    const prompt = `${message}`;
    const llmOuput = await this.geminiService.generate(prompt, config);

    if (!llmOuput) {
      throw new BadRequestException('An error has occured');
    }

    const data = JSON.parse(llmOuput) as LLMQueryResult;
    Logger.debug(`LLM Response: ${llmOuput}`);
    return data;
  }

  async requestFoursquare(
    llmResult: LLMQueryResult,
  ): Promise<RestaurantResultDetailsDto[]> {
    const { query, near, open_now, min_price, max_price, rating } =
      llmResult.parameters;

    const foursquarePayload: FoursquareSearchPlace = {
      query: query ?? null,
      near: near ?? null,
      min_price: min_price ? min_price.toString() : null,
      max_price: max_price ? max_price.toString() : null,
      open_now: open_now ? open_now.toString() : null,
      rating: rating ? rating.toString() : null,
      fsq_category_ids: this.configService.get('FOURSQUARE_CATEGORY_IDS'),
    };

    const searchPlaceResponse =
      await this.fourSquareService.searchPlaces(foursquarePayload);

    const restaurantResults = searchPlaceResponse.results.map((item) => {
      const { name, categories, location, hours, price, rating } = item;
      return {
        name,
        cuisine: categories.map<string>((item) => item.name),
        address: location.formatted_address,
        operatingHours: hours ? hours?.display : null,
        priceLevel: price ?? null,
        rating: rating ?? null,
      } as RestaurantResultDetailsDto;
    });

    return restaurantResults;
  }
}
