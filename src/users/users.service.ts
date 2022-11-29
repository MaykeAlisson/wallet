import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import UsersRepository from './users.repository';
import { hashSync } from 'bcrypt';
import { AccessDto } from 'src/auth/dto/access-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository
  ) {}

  async create(createUserDto: CreateUserDto) {
    // verificar se email ja nao existe

    const userEntity = new User();
    userEntity.name = createUserDto.name;
    userEntity.email = createUserDto.email;
    userEntity.password = hashSync(createUserDto.password, 10);
    userEntity.created = new Date();

    await this.userRepository.save(userEntity);

    return {};
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user)
      throw new NotFoundException(`not register user whith email ${email}`);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
