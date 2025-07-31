/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { RestaurantResultDetailsDto } from './dto/restaurant-result.dto';
import { GeminiService } from '../gemini/gemini.service';

import { FoursquareService } from '../foursquare/foursquare.service';
import { ConfigService } from '@nestjs/config';
import { LLMQueryResult } from './interfaces/llm-query-result.interface';
import { FoursquarePlaceAPIResponse } from '../foursquare/interfaces/foursquare-place-api-response.interface';

describe('RestaurantService', () => {
  let service: RestaurantService;
  // let geminiService: GeminiService;
  let fourSquareService: FoursquareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: GeminiService,
          useValue: {
            generate: jest.fn(),
          },
        },
        {
          provide: FoursquareService,
          useValue: {
            searchPlaces: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    // geminiService = module.get<GeminiService>(GeminiService);
    fourSquareService = module.get<FoursquareService>(FoursquareService);
  });

  it('should find a restaurant', async () => {
    const message = 'Find me a restaurant';

    const geminiResponseText =
      '{\n  "parameters": {\n    "near": "Downtown Los Angeles",\n    "open_now": true,\n    "price": 1,\n    "query": "sushi",\n    "rating": 4.0\n  }\n}';
    const requestGeminiSpy = jest
      .spyOn(service, 'requestGemini')
      .mockResolvedValue(JSON.parse(geminiResponseText));

    const foursquareResult: RestaurantResultDetailsDto[] = [
      {
        name: 'McDonalds',
        address: '',
        cuisine: [],
        operatingHours: null,
        priceLevel: null,
        rating: '5',
        latitude: '1',
        longitude: '2',
        tel: '',
      },
    ];
    jest
      .spyOn(service, 'requestFoursquare')
      .mockReturnValue(Promise.resolve(foursquareResult));

    const { data } = await service.search(message);

    expect(requestGeminiSpy).toHaveBeenCalled();
    expect(data[0].name).toBe('McDonalds');
    expect(data[0].rating).toBe('5');
    expect(data[0].latitude).toBe('1');
    expect(data[0].longitude).toBe('2');
    expect(data[0].tel).toBe('');
  });

  it('should parse foursquareResults correctly', async () => {
    const llmResult: LLMQueryResult = {
      parameters: {
        max_price: 1,
        query: '',
      },
    };

    const searchPlaceResponse: FoursquarePlaceAPIResponse = {
      results: [
        {
          name: 'Name',
          categories: [
            {
              name: 'Planet',
              short_name: 'five',
            },
          ],
          latitude: 1,
          longitude: 1,
          location: { formatted_address: '' },
          hours: { display: '100:00' },
          price: 1,
          rating: 4,
          tel: '555-55555',
        },
        {
          name: 'Other Option',
          categories: [
            {
              name: 'Restaurant',
              short_name: 'Resto',
            },
          ],
          hours: null,
          latitude: 2,
          longitude: 2,
          location: { formatted_address: 'My land' },
          price: 2,
          rating: 4,
          tel: null,
        },
      ],
    };
    const searchSpy = jest
      .spyOn(fourSquareService, 'searchPlaces')
      .mockResolvedValue(searchPlaceResponse);

    const data = await service.requestFoursquare(llmResult);

    expect(searchSpy).toHaveBeenCalledTimes(1);

    expect(data[0].name).toBe('Name');
    expect(data[0].operatingHours).toBe('100:00');
    expect(data[0].tel).toBe('555-55555');

    expect(data[1].name).toBe('Other Option');
    expect(data[1].tel).toBe(null);
    expect(data[1].operatingHours).toBe(null);
    expect(data[1].cuisine[0]).toBe('Restaurant');
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
});
