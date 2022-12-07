import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRuleTypeDto } from './dto/create-rule-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RulePercentType } from './entities/rule-percent-type.entity';

@Injectable()
export class RulesTypeService {
  constructor(
    @InjectRepository(RulePercentType)
    private readonly rulePercentTypeRepository: Repository<RulePercentType>,
  ) {}

  async createRule(walletId: number, dtos: CreateRuleTypeDto[]) {
    const filterDtos = this.removeDuplicate(dtos);
    this.isMaxPercent(filterDtos);
    const rules = await this.findByWallet(walletId);
    rules.forEach((rule) => this.deleteRule(rule));
    const entities: RulePercentType[] = [];
    filterDtos.forEach((rule) => {
      const entity = new RulePercentType();
      entity.type = rule.type;
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

  async remove(walletId: number) {
    const rules = await this.findByWallet(walletId);
    rules.forEach((rule) => this.deleteRule(rule));
    return {};
  }

  private removeDuplicate(rules: CreateRuleTypeDto[]) {
    const list = new Set();
    return rules.filter((rule) => {
      const duplicate = list.has(rule.type);
      list.add(rule.type);
      return !duplicate;
    });
  }

  private isMaxPercent(rules: CreateRuleTypeDto[]) {
    const amount = rules.reduce((value, element) => {
      return (value += element.percent);
    }, 0);
    if (amount === 100) return true;

    throw new BadRequestException('the max percente all type required is 100');
  }

  private async findByWallet(walletId: number) {
    return await this.rulePercentTypeRepository.findBy({ walletId });
  }

  private async deleteRule(entity: RulePercentType) {
    await this.rulePercentTypeRepository.delete(entity);
  }

  private async insertRule(entity: RulePercentType) {
    return this.rulePercentTypeRepository.insert(entity);
  }
}
