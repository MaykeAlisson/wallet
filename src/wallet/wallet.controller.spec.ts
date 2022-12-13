import { Test, TestingModule } from '@nestjs/testing';
import { RulesCoinService } from '../rules/rules-coin.service';
import { RulesCategoryService } from '../rules/rules-category.service';
import { RulesTypeService } from '../rules/rules-type.service';
import { UsersService } from '../users/users.service';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { RulesCategoryAmountService } from '../rules/rules-category-amount.service';
import { UsersModule } from '../users/users.module';

const repositoryMock = {
  insert: jest.fn(),
};

const httpServer = {
  get: jest.fn(),
  post: jest.fn(),
  path: jest.fn(),
  delete: jest.fn(),
};

describe('WalletController', () => {
  let controller: WalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletController],
      providers: [
        WalletService,
        UsersService,
        RulesTypeService,
        RulesCategoryService,
        RulesCoinService,
        RulesCategoryAmountService,
      ],
    })
      .useMocker((token) => {
        if (token === 'WalletRepository') {
          return repositoryMock;
        }
        if (token === 'UserRepository') {
          return repositoryMock;
        }
        if (token === 'RulePercentTypeRepository') {
          return repositoryMock;
        }
        if (token === 'RulePercentCategoryRepository') {
          return repositoryMock;
        }
        if (token === 'RulePercentCoinRepository') {
          return repositoryMock;
        }
        if (token === 'RuleAmountCategoryRepository') {
          return repositoryMock;
        }
      })
      .compile();

    controller = module.get<WalletController>(WalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
