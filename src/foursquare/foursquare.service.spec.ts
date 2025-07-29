import { Test, TestingModule } from '@nestjs/testing';
import { FoursquareService } from './foursquare.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

describe('FoursquareService', () => {
  let service: FoursquareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoursquareService,
        {
          provide: HttpService,
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FoursquareService>(FoursquareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
