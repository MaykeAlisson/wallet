import { Controller, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Req() req, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userId =req.user.id;
    return await this.usersService.update(+id, updateUserDto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    const userId =req.user.id;
    return await this.usersService.remove(+id, userId);
  }
}
