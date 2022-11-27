import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) { }

  async create(createUserDto: CreateUserDto) {
    const userEntity = new User();
    userEntity.name = createUserDto.name;
    userEntity.email = createUserDto.email;
    userEntity.password = createUserDto.password;
    userEntity.created = new Date()

    const result =  await this.userRepository.save(userEntity);
    console.log('user')
    console.log(JSON.stringify(result))
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
