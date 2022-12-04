import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RulePercentCoin } from './entities/rule-percente-coin';
import { CreateRuleCoinDto } from './dto/create-rule-coin';
import { UpdateRuleCoinDto } from './dto/update-rule-coin';

@Injectable()
export class RulesCoinService {
  constructor(
    @InjectRepository(RulePercentCoin)
    private readonly repository: Repository<RulePercentCoin>
  ){}

  async createRule(walletId: number, rule: CreateRuleCoinDto) {
    return 'This action adds a new rule';
  }

  async findAll() {
    return `This action returns all rules`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  async update(id: number, rule: UpdateRuleCoinDto) {
    return `This action updates a #${id} rule`;
  }

  async remove(id: number) {
    return `This action removes a #${id} rule`;
  }
}
