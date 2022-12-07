import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseArrayPipe,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateRuleTypeDto } from '../rules/dto/create-rule-type.dto';
import { CreateRuleCategoryDto } from 'src/rules/dto/create-rule-category';
import { UpdateRuleCategoryDto } from 'src/rules/dto/update-rule-category';
import { CreateRuleCoinDto } from 'src/rules/dto/create-rule-coin';
import { UpdateRuleCoinDto } from 'src/rules/dto/update-rule-coin';
import { CreateRuleCategoryAmountDto } from 'src/rules/dto/create-rule-category-amount';
import { UpdateRuleCategoryAmountDto } from 'src/rules/dto/update-rule-category-amount';

@UseGuards(AuthGuard('jwt'))
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Req() req, @Body() createWalletDto: CreateWalletDto) {
    const userId = req.user.id;
    return await this.walletService.create(userId, createWalletDto);
  }

  @Get()
  async findAll(@Req() req) {
    const userId = req.user.id;
    return await this.walletService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return await this.walletService.findOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ) {
    const userId = req.user.id;
    return await this.walletService.update(+id, updateWalletDto, userId);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return await this.walletService.remove(+id, userId);
  }

  @Post(':walletId/rule/type')
  async createRuleType(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body(new ParseArrayPipe({ items: CreateRuleTypeDto }))
    createRuleTypeDto: CreateRuleTypeDto[],
  ) {
    const userId = req.user.id;
    return this.walletService.createRuleType(
      userId,
      +walletId,
      createRuleTypeDto,
    );
  }

  @Get(':walletId/rule/type')
  async findAllRuleType(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.walletService.findAllRuleType(userId, +walletId);
  }

  @Delete(':walletId/rule/type')
  async deleteRuleType(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.walletService.deleteAllRuleType(userId, +walletId);
  }

  @Post(':walletId/rule/category')
  async createRuleCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body() createRuleCategoryDto: CreateRuleCategoryDto,
  ) {}

  @Get(':walletId/rule/category')
  async findAllRuleCategory(@Req() req, @Param('walletId') walletId: string) {}

  @Get(':walletId/rule/category/:id')
  async findOneRuleCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {}

  @Patch(':walletId/rule/category/:id')
  async updateRuleCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
    @Body() updateRuleCategoryDto: UpdateRuleCategoryDto,
  ) {}

  @Delete(':walletId/rule/category/:id')
  async deleteRuleCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {}

  @Post(':walletId/rule/coin')
  async createRuleCoin(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body() createRuleCoinDto: CreateRuleCoinDto,
  ) {}

  @Get(':walletId/rule/coin')
  async findAllRuleCoin(@Req() req, @Param('walletId') walletId: string) {}

  @Get(':walletId/rule/coin/:id')
  async findOneRuleCoin(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {}

  @Patch(':walletId/rule/coin/:id')
  async updateRuleCoin(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
    @Body() updateRuleCoinDto: UpdateRuleCoinDto,
  ) {}

  @Delete(':walletId/rule/coin/:id')
  async deleteRuleCoin(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {}

  @Post(':walletId/rule/category-amount')
  async createRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body() createRuleCategoryAmountDto: CreateRuleCategoryAmountDto,
  ) {}

  @Get(':walletId/rule/category-amount')
  async findAllRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
  ) {}

  @Get(':walletId/rule/category-amount/:id')
  async findOneRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {}

  @Patch(':walletId/rule/category-amount/:id')
  async updateRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
    @Body() updateRuleAmountCategoryDto: UpdateRuleCategoryAmountDto,
  ) {}

  @Delete(':walletId/rule/category-amount/:id')
  async deleteRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {}
}
