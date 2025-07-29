/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';
import { RestaurantResultDetailsDto } from './dto/restaurant-result.dto';
import { GeminiService } from '../gemini/gemini.service';

import { FoursquareService } from '../foursquare/foursquare.service';

describe('RestaurantService', () => {
  let service: RestaurantService;
  // let geminiService: GeminiService;
  // let fourSquareService: FoursquareService;

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
      ],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    // geminiService = module.get<GeminiService>(GeminiService);
    // fourSquareService = module.get<FoursquareService>(FoursquareService);
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
      },
    ];
    jest
      .spyOn(service, 'requestFoursquare')
      .mockReturnValue(Promise.resolve(foursquareResult));

    const { data } = await service.search(message);
    expect(data[0].name).toBe('McDonalds');
    expect(requestGeminiSpy).toHaveBeenCalled();
  });

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
});
