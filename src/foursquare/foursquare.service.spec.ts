import { Test, TestingModule } from '@nestjs/testing';
import { FoursquareService } from './foursquare.service';

describe('FoursquareService', () => {
  let service: FoursquareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoursquareService],
    }).compile();

    service = module.get<FoursquareService>(FoursquareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
