import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuleAmountCategory } from './entities/rule-amount-category.entity';
import { CreateRuleCategoryAmountDto } from './dto/create-rule-category-amount';
import { UpdateRuleCategoryAmountDto } from './dto/update-rule-category-amount';
import { isNegative, isNotEmpty, isNumber } from 'class-validator';

@Injectable()
export class RulesCategoryAmountService {
  constructor(
    @InjectRepository(RuleAmountCategory)
    private readonly repository: Repository<RuleAmountCategory>,
  ) {}

  async createRule(walletId: number, dtos: CreateRuleCategoryAmountDto[]) {
    const filterDtos = this.removeDuplicate(dtos);
    const duplicate = await this.getRulesExists(walletId, filterDtos);
    const entities: RuleAmountCategory[] = [];
    filterDtos.forEach((dto) => {
      const entity = new RuleAmountCategory();
      entity.category = dto.category;
      entity.amount = dto.amount;
      entity.walletId = walletId;
      entity.created = new Date();
      entities.push(entity);
    });
    for (const entity of entities) {
      await this.insertRule(entity);
    }
    for (const entity of duplicate) {
      await this.deleteRule(entity);
    }
    return {};
  }

  async findAll(walletId: number) {
    return this.findByWallet(walletId);
  }

  async update(
    walletId: number,
    id: number,
    rule: UpdateRuleCategoryAmountDto,
  ) {
    const entity = await this.findByIdAndWallet(id, walletId);
    entity.amount = this.getAmountValid(rule.amount);
    await this.repository.save(entity);
    return entity;
  }

  async remove(walletId: number, id: number) {
    const entity = await this.findByIdAndWallet(id, walletId);
    await this.deleteRule(entity);
    return {};
  }

  private removeDuplicate(rules: CreateRuleCategoryAmountDto[]) {
    const list = new Set();
    return rules.filter((rule) => {
      const duplicate = list.has(rule.category);
      list.add(rule.category);
      return !duplicate;
    });
  }

  private async getRulesExists(
    walletId: number,
    dtos: CreateRuleCategoryAmountDto[],
  ) {
    const rules = await this.findByWallet(walletId);
    const category = dtos.map((dto) => dto.category);
    return rules.filter((rule) => category.includes(rule.category));
  }

  private async findByWallet(walletId: number) {
    return await this.repository.findBy({ walletId });
  }

  private async findByIdAndWallet(id: number, walletId: number) {
    const result = await this.repository.findOneBy({ id, walletId });
    if (!result)
      throw new NotFoundException(
        `not found rule with id ${id} and wallet ${walletId}`,
      );

    return result;
  }

  private async deleteRule(entity: RuleAmountCategory) {
    await this.repository.delete(entity);
  }

  private async insertRule(entity: RuleAmountCategory) {
    return this.repository.insert(entity);
  }

  private getAmountValid(amount: number): number {
    if (
      isNotEmpty(amount) &&
      isNumber(amount) &&
      !isNegative(amount) &&
      amount > 1 &&
      amount <= 100
    )
      return amount;

    throw new BadRequestException('min amount 1 and max 100');
  }
}
