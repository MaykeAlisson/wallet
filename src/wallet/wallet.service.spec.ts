import { Test, TestingModule } from '@nestjs/testing';
import { RulesCoinService } from '../rules/rules-coin.service';
import { RulesCategoryService } from '../rules/rules-category.service';
import { RulesTypeService } from '../rules/rules-type.service';
import { UsersService } from '../users/users.service';
import { WalletService } from './wallet.service';
import { RulesCategoryAmountService } from '../rules/rules-category-amount.service';

const repositoryMock = {
  insert: jest.fn(),
};
describe('WalletService', () => {
  let service: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
        if (token === 'WalletRepository') return repositoryMock;
        if (token === 'UserRepository') return repositoryMock;
        if (token === 'RulePercentTypeRepository') return repositoryMock;
        if (token === 'RulePercentCategoryRepository') return repositoryMock;
        if (token === 'RulePercentCoinRepository') return repositoryMock;
        if (token === 'RuleAmountCategoryRepository') return repositoryMock;
        // if (token === RulesTypeService) return;
      })
      .compile();

    service = module.get<WalletService>(WalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
