import { Test, TestingModule } from '@nestjs/testing';
import { AssertsService } from './asserts.service';

describe('AssertsService', () => {
  let service: AssertsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssertsService],
    }).compile();

    service = module.get<AssertsService>(AssertsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
