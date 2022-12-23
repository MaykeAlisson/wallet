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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssertsService } from './asserts.service';
import { CreateAssertDto } from './dto/create-assert.dto';
import { UpdateAssertDto } from './dto/update-assert.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('asserts')
export class AssertsController {
  constructor(private readonly assertsService: AssertsService) {}

  @Post(':walletId/create')
  create(
    @Req() req,
    @Param('walletId') walletId: string,
    @Body() createAssertDto: CreateAssertDto,
  ) {
    const userId = req.user.id;
    return this.assertsService.create(userId, +walletId, createAssertDto);
  }

  @Get(':walletId/find')
  findAll(@Req() req, @Param('walletId') walletId: string) {
    const userId = req.user.id;
    return this.assertsService.findAll(userId, +walletId);
  }

  @Get(':walletId/find/:id')
  findOne(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {
    const userId = req.user.id;
    return this.assertsService.findOne(userId, +walletId, +id);
  }

  @Patch(':walletId/update/:id')
  update(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
    @Body() updateAssertDto: UpdateAssertDto,
  ) {
    const userId = req.user.id;
    return this.assertsService.update(userId, +walletId, +id, updateAssertDto);
  }

  @Delete(':walletId/delete/:id')
  remove(
    @Req() req,
    @Param('walletId') walletId: string,
    @Param('id') id: string,
  ) {
    const userId = req.user.id;
    return this.assertsService.remove(userId, +walletId, +id);
  }
}
