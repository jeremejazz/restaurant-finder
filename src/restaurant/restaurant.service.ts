import { BadRequestException, Injectable } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';
import { RestaurantResultDto } from './dto/restaurant-result.dto';
import { LLMQueryResult } from './interfaces/llm-query-result';

@Injectable()
export class RestaurantService {
  constructor(protected readonly geminiService: GeminiService) {}
  async search(message: string): Promise<RestaurantResultDto> {
    const queryData = await this.requestGemini(message);

    this.requestFoursquare(queryData);
    // FourSquare API Request

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
  requestFoursquare(query: LLMQueryResult) {
    return query;
  }
}
