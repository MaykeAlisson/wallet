import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RulePercentCategory } from './entities/rule-percent-category.entity';
import { CreateRuleCategoryDto } from './dto/create-rule-category';

@Injectable()
export class RulesCategoryService {
  constructor(
    @InjectRepository(RulePercentCategory)
    private readonly repository: Repository<RulePercentCategory>,
  ) {}

  async createRule(walletId: number, dtos: CreateRuleCategoryDto[]) {
    const filterDtos = this.removeDuplicate(dtos);
    this.isMaxPercent(filterDtos);
    const rules = await this.findByWallet(walletId);
    rules.forEach((rule) => this.deleteRule(rule));
    const entities: RulePercentCategory[] = [];
    filterDtos.forEach((rule) => {
      const entity = new RulePercentCategory();
      entity.category = rule.category;
      entity.percent = rule.percent;
      entity.walletId = walletId;
      entity.created = new Date();
      entities.push(entity);
    });
    for (const entity of entities) {
      await this.insertRule(entity);
    }
    return {};
  }

  async findAll(walletId: number) {
    return this.findByWallet(walletId);
  }

  async remove(id: number) {
    return `This action removes a #${id} rule`;
  }

  private removeDuplicate(rules: CreateRuleCategoryDto[]) {
    const list = new Set();
    return rules.filter((rule) => {
      const duplicate = list.has(rule.category);
      list.add(rule.category);
      return !duplicate;
    });
  }

  private isMaxPercent(rules: CreateRuleCategoryDto[]) {
    const amount = rules.reduce((value, element) => {
      return (value += element.percent);
    }, 0);
    if (amount === 100) return true;
    throw new BadRequestException('the max percente all type required is 100');
  }

  private async findByWallet(walletId: number) {
    return await this.repository.findBy({ walletId });
  }

  private async deleteRule(entity: RulePercentCategory) {
    await this.repository.delete(entity);
  }

  private async insertRule(entity: RulePercentCategory) {
    return this.repository.insert(entity);
  }
}
