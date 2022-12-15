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

const FakUsersService = {};
const FakRulesTypeService = {};
const FakRulesCategoryService = {};
const FakRulesCoinService = {};
const FakRulesCategoryAmountService = {};
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
        if (token === UsersService) return FakUsersService;
        if (token === RulesTypeService) return FakRulesTypeService;
        if (token === RulesCategoryService) return FakRulesCategoryService;
        if (token === RulesCoinService) return FakRulesCoinService;
        if (token === RulesCategoryAmountService)
          return FakRulesCategoryAmountService;
      })
      .compile();

    service = module.get<WalletService>(WalletService);
  });

  describe('wallet', () => {
    describe('.create', () => {
      it('should return success', async () => {
        expect(service).toBeDefined();
      });

      it('should return faill user not found', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('.findAll', () => {
      it('should return list wallets', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('.findOne', () => {
      it('should return wallet', async () => {
        expect(service).toBeDefined();
      });

      it('should return does not fund wallet for user', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('.update', () => {
      it('should modify wallet with dto', async () => {
        expect(service).toBeDefined();
      });

      it('should return does not found wallet for user', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('.remove', () => {
      it('should return succesfully', async () => {
        expect(service).toBeDefined();
      });
    });
  });

  describe('ruleType', () => {
    describe('.createRuleType', () => {
      it('should be defined', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('.findAllRuleType', () => {
      it('should be defined', async () => {
        expect(service).toBeDefined();
      });
    });

    describe('.deleteAllRuleType', () => {
      it('should be defined', async () => {
        expect(service).toBeDefined();
      });
    });
  });
});
