import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { nvl } from './provider/wallet.nvl';
import { RulesTypeService } from '../rules/rules-type.service';
import { RulesCategoryService } from '../rules/rules-category.service';
import { RulesCoinService } from '../rules/rules-coin.service';
import { RulesCategoryAmountService } from '../rules/rules-category-amount.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { CreateRuleTypeDto } from '../rules/dto/create-rule-type.dto';
import { CreateRuleCategoryDto } from 'src/rules/dto/create-rule-category';
import { CreateRuleCoinDto } from 'src/rules/dto/create-rule-coin';
import { UpdateRuleCategoryAmountDto } from 'src/rules/dto/update-rule-category-amount';
import { CreateRuleCategoryAmountDto } from 'src/rules/dto/create-rule-category-amount';
import { Assert } from 'src/asserts/entities/assert.entity';
import Decimal from 'decimal.js';

@Injectable()
export class WalletService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly userService: UsersService,
    private readonly rulesTypeService: RulesTypeService,
    private readonly rulesCategoryService: RulesCategoryService,
    private readonly rulesCoinService: RulesCoinService,
    private readonly rulesCategoryAmountSevice: RulesCategoryAmountService,
  ) {}

  async create(userId: number, createWalletDto: CreateWalletDto) {
    await this.checkUser(userId);
    const entity = new Wallet();
    entity.name = createWalletDto.name;
    entity.maxPecentAssert = createWalletDto.max_pecent_assert;
    entity.userId = userId;
    entity.created = new Date();

    this.walletRepository.create(entity);

    const save = await this.walletRepository.save(entity);

    createWalletDto.id = save.id;

    return createWalletDto;
  }

  async findAll(userId: number) {
    await this.checkUser(userId);
    const query = await this.walletRepository.findBy({ userId });
    return query;
  }

  async findOne(userId: number, id: number) {
    await this.checkUser(userId);
    const wallet = await this.findByIdAndUser(id, userId);
    return wallet;
  }

  async findOneDetails(userId: number, id: number) {
    await this.checkUser(userId);
    const transaction = await this.dataSource.manager.transaction(
      'SERIALIZABLE',
      async (transactionManager) => {
        await this.findByIdAndUser(id, userId);
        return this.findDetails(transactionManager, id);
      },
    );

    return transaction;
  }

  async findOneRules(userId: number, id: number) {
    await this.checkUser(userId);
    await this.findByIdAndUser(id, userId);
    const rulesType = await this.findAllRuleType(userId, id);
    const rulesCategory = await this.findAllRuleCategory(userId, id);
    const rulesCoin = await this.findAllRuleCoin(userId, id);
    const rulesCategoryAmount = await this.findAllRuleCategoryAmount(
      userId,
      id,
    );

    return {
      type: rulesType,
      category: rulesCategory,
      category_amount: rulesCategoryAmount,
      coin: rulesCoin,
    };
  }

  async update(id: number, updateWalletDto: UpdateWalletDto, userId: number) {
    await this.checkUser(userId);
    const wallet = await this.findByIdAndUser(id, userId);
    const entity = this.walletRepository.create(nvl(wallet, updateWalletDto));

    await this.walletRepository.save(entity);

    updateWalletDto.id = entity.id;
    updateWalletDto.name = entity.name;
    updateWalletDto.max_pecent_assert = entity.maxPecentAssert;

    return updateWalletDto;
  }

  async remove(id: number, userId: number) {
    await this.checkUser(userId);
    const wallet = await this.findByIdAndUser(id, userId);
    await this.walletRepository.delete(wallet);
    return {};
  }

  async createRuleType(
    userId: number,
    walletId: number,
    dtos: CreateRuleTypeDto[],
  ) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesTypeService.createRule(walletId, dtos);
  }

  async findAllRuleType(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesTypeService.findAll(walletId);
  }

  async deleteAllRuleType(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesTypeService.remove(walletId);
  }

  async createRuleCategory(
    userId: number,
    walletId: number,
    rules: CreateRuleCategoryDto[],
  ) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryService.createRule(walletId, rules);
  }

  async findAllRuleCategory(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryService.findAll(walletId);
  }

  async deleteAllRuleCategory(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryService.remove(walletId);
  }

  async createRuleCoin(
    userId: number,
    walletId: number,
    rules: CreateRuleCoinDto[],
  ) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCoinService.createRule(walletId, rules);
  }

  async findAllRuleCoin(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCoinService.findAll(walletId);
  }

  async deleteAllRuleCoin(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCoinService.remove(walletId);
  }

  async createRuleCategoryAmount(
    userId: number,
    walletId: number,
    dtos: CreateRuleCategoryAmountDto[],
  ) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryAmountSevice.createRule(walletId, dtos);
  }

  async findAllRuleCategoryAmount(userId: number, walletId: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryAmountSevice.findAll(walletId);
  }

  async updateRuleCategoryAmount(
    userId: number,
    walletId: number,
    id: number,
    dto: UpdateRuleCategoryAmountDto,
  ) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryAmountSevice.update(walletId, id, dto);
  }

  async deleteRuleCategoryAmount(userId: number, walletId: number, id: number) {
    await this.findByIdAndUser(walletId, userId);
    return this.rulesCategoryAmountSevice.remove(walletId, id);
  }

  public async findByIdAndUser(id: number, userId: number): Promise<Wallet> {
    await this.checkUser(userId);
    const wallet = await this.walletRepository.findOneBy({ id, userId });
    if (!wallet)
      throw new NotFoundException(
        `not register wallet whith id ${id} and userId ${userId}`,
      );
    return wallet;
  }

  private async checkUser(userId: number): Promise<User> {
    return await this.userService.userById(userId);
  }

  private async findDetails(manager: EntityManager, walletId: number) {
    const { amount } = await manager
      .getRepository(Assert)
      .createQueryBuilder('assert')
      .select('SUM(assert.amount * assert.price)', 'amount')
      .where('assert.wallet_id = :walletId', { walletId })
      .getRawOne();

    const type = await manager
      .getRepository(Assert)
      .createQueryBuilder('a')
      .select('a.type, SUM(a.amount * a.price)', 'amount')
      .where('a.wallet_id = :walletId', { walletId })
      .groupBy('a.type')
      .getRawMany();

    const percentType = this.percentType(type, amount);

    const categorys = await manager
      .getRepository(Assert)
      .createQueryBuilder('a')
      .select('a.category, SUM(a.amount * a.price)', 'amount')
      .where('a.wallet_id = :walletId', { walletId })
      .groupBy('a.category')
      .getRawMany();

    const percentCategory = this.percentCategory(categorys, amount);

    const categoryQtd = await manager
      .getRepository(Assert)
      .createQueryBuilder('a')
      .select('a.category, COUNT(a.name)', 'amount')
      .where('a.wallet_id = :walletId', { walletId })
      .groupBy('a.category')
      .getRawMany();

    const coins = await manager
      .getRepository(Assert)
      .createQueryBuilder('a')
      .select('a.coin, SUM(a.amount * a.price)', 'amount')
      .where('a.wallet_id = :walletId', { walletId })
      .groupBy('a.coin')
      .getRawMany();

    const percentCoin = this.percentCoin(coins, amount);

    return {
      amount: amount,
      type: percentType,
      category: percentCategory,
      category_amount: categoryQtd,
      coin: percentCoin,
    };
  }

  private percentType(types: Array<any>, amount: number) {
    return types.map((value) => {
      return {
        type: value.type,
        percent: new Decimal(value.amount).div(amount).mul(100).toFixed(2),
      };
    });
  }

  private percentCategory(categorys: Array<any>, amount: number) {
    return categorys.map((value) => {
      return {
        category: value.category,
        percent: new Decimal(value.amount).div(amount).mul(100).toFixed(2),
      };
    });
  }

  private percentCoin(coins: Array<any>, amount: number) {
    return coins.map((value) => {
      return {
        category: value.coin,
        percent: new Decimal(value.amount).div(amount).mul(100).toFixed(2),
      };
    });
  }
}
