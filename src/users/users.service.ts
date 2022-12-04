import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import { nvl } from './provider/user.nvl';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exist = await this.existUserByEmail(createUserDto.email);

    if (exist) throw new BadRequestException(`Email already registered`);

    const userEntity = new User();
    userEntity.name = createUserDto.name;
    userEntity.email = createUserDto.email;
    userEntity.password = hashSync(createUserDto.password, 10);
    userEntity.created = new Date();

    await this.userRepository.insert(userEntity);

    return {};
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user)
      throw new NotFoundException(`not register user whith email ${email}`);

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId: number) {
    const user = await this.userById(id);

    if (user.id != userId) throw new ForbiddenException();

    const entity = this.userRepository.create(nvl(user, updateUserDto));

    await this.userRepository.save(entity);

    return {};
  }

  async remove(id: number, userId: number) {
    const user = await this.userById(id);

    if (user.id != userId) throw new ForbiddenException();

    await this.userRepository.delete(user);

    return {};
  }

  private async existUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return isEmpty(user) ? false : true;
  }

  async userById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`not register user whith id ${id}`);
    return user;
  }
}
