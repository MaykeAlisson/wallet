import { Test, TestingModule } from '@nestjs/testing';
import { RulesTypeService } from './rules-type.service';

describe('RulesService', () => {
  let service: RulesTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulesTypeService],
    }).compile();

    service = module.get<RulesTypeService>(RulesTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
