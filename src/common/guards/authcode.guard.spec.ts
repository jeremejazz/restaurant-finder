import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AuthCodeGuard } from './authcode.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthCodeGuard', () => {
  let guard: AuthCodeGuard;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthCodeGuard,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('code'),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthCodeGuard>(AuthCodeGuard);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should check for authentication code', async () => {
    const configSpy = jest.spyOn(configService, 'get').mockReturnValue('20');

    const mockExecutionContext: ExecutionContext = {
      getClass: jest.fn(),

      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          query: {
            code: '20',
          },
        }),
      }),
      switchToWs: jest.fn(),
      getType: jest.fn(),
    };

    const output = await guard.canActivate(mockExecutionContext);
    expect(output).toBe(true);
    expect(configSpy).toHaveBeenCalled();
  });
});
