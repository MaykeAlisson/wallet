import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RulePercentCoin } from './entities/rule-percente-coin.entity';
import { CreateRuleCoinDto } from './dto/create-rule-coin';

@Injectable()
export class RulesCoinService {
  constructor(
    @InjectRepository(RulePercentCoin)
    private readonly repository: Repository<RulePercentCoin>,
  ) {}

  async createRule(walletId: number, dtos: CreateRuleCoinDto[]) {
    const filterDtos = this.removeDuplicate(dtos);
    this.isMaxPercent(filterDtos);
    const rules = await this.findByWallet(walletId);
    rules.forEach((rule) => this.deleteRule(rule));
    const entities: RulePercentCoin[] = [];
    filterDtos.forEach((rule) => {
      const entity = new RulePercentCoin();
      entity.coin = rule.coin;
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
    rules.forEach(async (rule) => await this.deleteRule(rule));
    return {};
  }

  private removeDuplicate(rules: CreateRuleCoinDto[]) {
    const list = new Set();
    return rules.filter((rule) => {
      const duplicate = list.has(rule.coin);
      list.add(rule.coin);
      return !duplicate;
    });
  }

  private isMaxPercent(rules: CreateRuleCoinDto[]) {
    const amount = rules.reduce((value, element) => {
      return (value += element.percent);
    }, 0);
    if (amount === 100) return true;
    throw new BadRequestException('the max percente all coin required is 100');
  }

  private async findByWallet(walletId: number) {
    return await this.repository.findBy({ walletId });
  }

  private async deleteRule(entity: RulePercentCoin) {
    await this.repository.delete(entity);
  }

  private async insertRule(entity: RulePercentCoin) {
    return this.repository.insert(entity);
  }
}
