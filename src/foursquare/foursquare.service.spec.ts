import { Test, TestingModule } from '@nestjs/testing';
import { FoursquareService } from './foursquare.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { FoursquareSearchPlace } from './interfaces/foursquare-search-place.interface';
import { FoursquarePlaceAPIResponse } from './interfaces/foursquare-place-api-response.interface';

describe('FoursquareService', () => {
  let service: FoursquareService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoursquareService,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(),
            },
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('KEY'),
            getOrThrow: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FoursquareService>(FoursquareService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('Should Search for a place', async () => {
    const baseUrl = 'http://example.com';
    const searchQuery: FoursquareSearchPlace = {
      query: 'Chicken Fastfood',
      near: 'New York',
      max_price: '1',
      fsq_category_ids: 'fsq_category_ids',
      min_price: 'min_price',
      open_now: 'open_now',
      rating: '5',
    };
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(baseUrl);
    const httpSvcSpy = jest
      .spyOn(httpService.axiosRef, 'get')
      .mockResolvedValue({
        data: {
          results: [
            {
              name: 'Los Pollos Chicken',
            },
          ],
        } as FoursquarePlaceAPIResponse,
      });

    const data = await service.searchPlaces(searchQuery);

    const url = new URL(baseUrl);

    url.searchParams.append('query', searchQuery.query ?? '');
    url.searchParams.append('near', searchQuery.near ?? '');
    url.searchParams.append('max_price', searchQuery.max_price ?? '');
    url.searchParams.append('min_price', searchQuery.min_price ?? '');
    url.searchParams.append('open_now', searchQuery.open_now ?? '');
    url.searchParams.append('rating', searchQuery.rating ?? '');
    url.searchParams.append(
      'fsq_category_ids',
      searchQuery.fsq_category_ids ?? '',
    );

    expect(httpSvcSpy).toHaveBeenCalledWith(url.toString(), expect.anything());

    expect(data.results[0].name).toBe('Los Pollos Chicken');
  });
});
