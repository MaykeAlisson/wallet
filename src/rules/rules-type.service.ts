import { Injectable } from '@nestjs/common';
import { CreateRuleTypeDto } from './dto/create-rule-type.dto';
import { UpdateRuleTypeDto } from './dto/update-rule-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RulePercentType } from './entities/rule-percent-type.entity';

@Injectable()
export class RulesTypeService {
  constructor(
    @InjectRepository(RulePercentType)
    private readonly rulePercentTypeRepository: Repository<RulePercentType>
  ){}

  async createRule(walletId: number, createRuleTypeDto: CreateRuleTypeDto) {
    return 'This action adds a new rule';
  }

  async findAll() {
    return `This action returns all rules`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  async update(id: number, updateRuleTypeDto: UpdateRuleTypeDto) {
    return `This action updates a #${id} rule`;
  }

  async remove(id: number) {
    return `This action removes a #${id} rule`;
  }
}
