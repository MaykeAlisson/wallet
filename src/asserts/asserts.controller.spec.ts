import { Test, TestingModule } from '@nestjs/testing';
import { AssertsController } from './asserts.controller';
import { AssertsService } from './asserts.service';

describe('AssertsController', () => {
  let controller: AssertsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssertsController],
      providers: [AssertsService],
    }).compile();

    controller = module.get<AssertsController>(AssertsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
