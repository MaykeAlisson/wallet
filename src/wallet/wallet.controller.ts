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
import { CreateRuleCategoryDto } from '../rules/dto/create-rule-category';
import { CreateRuleCoinDto } from '../rules/dto/create-rule-coin';
import { CreateRuleCategoryAmountDto } from '../rules/dto/create-rule-category-amount';
import { UpdateRuleCategoryAmountDto } from '../rules/dto/update-rule-category-amount';

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
    @Body(new ParseArrayPipe({ items: CreateRuleCategoryDto }))
    createRuleCategoryDto: CreateRuleCategoryDto[],
  ) {
    const userId = req.user.id;
    return this.walletService.createRuleCategory(
      userId,
      +walletId,
      createRuleCategoryDto,
    );
  }

  @Get(':walletId/rule/category')
  async findAllRuleCategory(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.walletService.findAllRuleCategory(userId, +walletId);
  }

  @Delete(':walletId/rule/category')
  async deleteRuleCategory(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.walletService.deleteAllRuleCategory(userId, +walletId);
  }

  @Post(':walletId/rule/coin')
  async createRuleCoin(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body(new ParseArrayPipe({ items: CreateRuleCoinDto }))
    dtos: CreateRuleCoinDto[],
  ) {
    const userId = req.user.id;
    return this.walletService.createRuleCoin(userId, +walletId, dtos);
  }

  @Get(':walletId/rule/coin')
  async findAllRuleCoin(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.walletService.findAllRuleCoin(userId, +walletId);
  }

  @Delete(':walletId/rule/coin')
  async deleteRuleCoin(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.walletService.deleteAllRuleCoin(userId, +walletId);
  }

  @Post(':walletId/rule/category-amount')
  async createRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body(new ParseArrayPipe({ items: CreateRuleCategoryAmountDto }))
    dtos: CreateRuleCategoryAmountDto[],
  ) {
    const userId = req.user.id;
    return this.walletService.createRuleCategoryAmount(userId, +walletId, dtos);
  }

  @Get(':walletId/rule/category-amount')
  async findAllRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
  ) {
    const userId = req.user.id;
    return this.walletService.findAllRuleCategoryAmount(userId, +walletId);
  }

  @Patch(':walletId/rule/category-amount/:id')
  async updateRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
    @Body() updateRuleAmountCategoryDto: UpdateRuleCategoryAmountDto,
  ) {
    const userId = req.user.id;
    return this.walletService.updateRuleCategoryAmount(
      userId,
      +walletId,
      +id,
      updateRuleAmountCategoryDto,
    );
  }

  @Delete(':walletId/rule/category-amount/:id')
  async deleteRuleAmountCategory(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {
    const userId = req.user.id;
    return this.walletService.deleteRuleCategoryAmount(userId, +walletId, +id);
  }
}
