import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nvl } from './provider/wallet.nvl';
import { RulesTypeService } from '../rules/rules-type.service';
import { RulesCategoryService } from 'src/rules/rules-category.service';
import { RulesCoinService } from 'src/rules/rules-coin.service';
import { RulesCategoryAmountService } from 'src/rules/rules-category-amount.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateRuleTypeDto } from 'src/rules/dto/create-rule-type.dto';


@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly userService: UsersService,
    private readonly rulesTypeService: RulesTypeService,
    private readonly rulesCategoryService: RulesCategoryService,
    private readonly rulesCoinService: RulesCoinService,
    private readonly rulesCategoryAmountSevice: RulesCategoryAmountService
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
    const wallet = this.findByIdAndUser(id, userId);
    return wallet;
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

  async createRuleType(userId: number, walletId: number, dto: CreateRuleTypeDto){
    await this.findByIdAndUser(walletId, userId);
    return this.rulesTypeService.createRule(walletId, dto);
  }

  private async findByIdAndUser(id: number, userId: number) : Promise<Wallet> {
    await this.checkUser(userId);
    const wallet = await this.walletRepository.findOneBy({ id, userId });
    if (!wallet)
      throw new NotFoundException(
        `not register wallet whith id ${id} and userId ${userId}`,
      );
    return wallet;
  }

  private async checkUser(userId: number) : Promise<User>{
   return await this.userService.userById(userId);
  }
}
