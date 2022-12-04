import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RulePercentCategory } from './entities/rule-percent-category';
import { CreateRuleCategoryDto } from './dto/create-rule-category';
import { UpdateRuleCategoryDto } from './dto/update-rule-category';

@Injectable()
export class RulesCategoryService {
  constructor(
    @InjectRepository(RulePercentCategory)
    private readonly repository: Repository<RulePercentCategory>
  ){}

  async createRule(walletId: number, rule: CreateRuleCategoryDto) {
    return 'This action adds a new rule';
  }

  async findAll() {
    return `This action returns all rules`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  async update(id: number, rule: UpdateRuleCategoryDto) {
    return `This action updates a #${id} rule`;
  }

  async remove(id: number) {
    return `This action removes a #${id} rule`;
  }
}
