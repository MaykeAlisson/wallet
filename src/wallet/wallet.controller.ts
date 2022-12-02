import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { AuthGuard } from '@nestjs/passport';

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
  async update(@Req() req, @Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    const userId = req.user.id;
    return await this.walletService.update(+id, updateWalletDto, userId);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const userId = req.user.id;
    return await this.walletService.remove(+id, userId);
  }
}
