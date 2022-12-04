import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RuleAmountCategory } from './entities/rule-amount-category';
import { CreateRuleCategoryAmountDto } from './dto/create-rule-category-amount';
import { UpdateRuleCategoryAmountDto } from './dto/update-rule-category-amount';

@Injectable()
export class RulesCategoryAmountService {
  constructor(
    @InjectRepository(RuleAmountCategory)
    private readonly repository: Repository<RuleAmountCategory>
  ){}

  async createRule(walletId: number, rule: CreateRuleCategoryAmountDto) {
    return 'This action adds a new rule';
  }

  async findAll() {
    return `This action returns all rules`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  async update(id: number, rule: UpdateRuleCategoryAmountDto) {
    return `This action updates a #${id} rule`;
  }

  async remove(id: number) {
    return `This action removes a #${id} rule`;
  }
}
