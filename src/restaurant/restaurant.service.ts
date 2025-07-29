/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { BadRequestException, Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { RestaurantResultDto } from './dto/restaurant-result.dto';
import { LLMQueryResult } from './interfaces/llm-query-result.interface';
import { FoursquareService } from '../foursquare/foursquare.service';
import { FoursquareSearchPlace } from '../foursquare/interfaces/foursquare-search-place.interface';

@Injectable()
export class RestaurantService {
  constructor(
    protected readonly geminiService: GeminiService,
    protected readonly fourSquareService: FoursquareService,
  ) {}
  async search(message: string): Promise<RestaurantResultDto> {
    const queryData = await this.requestGemini(message);

    const foursquareResult = await this.requestFoursquare(queryData);
    // FourSquare API Request

    console.log(foursquareResult);
    return {
      name: '',
      address: '',
      cuisine: '',
      rating: null,
      priceLevel: null,
      operatingHours: null,
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
              price: {
                type: 'INTEGER',
                description:
                  'Valid values range between where 1 is most affordable and 4 is most expensive',
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

    return data;
  }
  async requestFoursquare(llmResult: LLMQueryResult) {
    const { query, near, open_now, price, rating } = llmResult.parameters;

    const min_price = price ? price.toString() : null;
    const max_price = price ? price.toString() : null;

    const foursquarePayload: FoursquareSearchPlace = {
      query: query ?? null,
      near: near ?? null,
      min_price,
      max_price,
      open_now: open_now ? open_now.toString() : null,
      rating: rating ? rating.toString() : null,
    };
    return this.fourSquareService.searchPlaces(foursquarePayload);
  }
}
