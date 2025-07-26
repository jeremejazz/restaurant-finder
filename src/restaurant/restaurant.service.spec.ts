import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from './restaurant.service';

describe('RestaurantService', () => {
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantService],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
  });

  it('should find a restaurant', async () => {
    const message = 'Find me a restaurant';
    const data: RestaurantResultDto = await service.search(message);

    expect(data.name).toBe('McDonalds');
  });
});
