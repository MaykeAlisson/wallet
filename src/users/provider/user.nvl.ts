import { isEmpty } from 'class-validator';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { hashSync } from 'bcrypt';

export function nvl(entity: User, dto: UpdateUserDto): User {
  entity.name = isEmpty(dto.name) ? entity.name : dto.name;
  entity.email = isEmpty(dto.email) ? entity.email : dto.email;
  entity.password = isEmpty(dto.password)
    ? entity.password
    : hashSync(dto.password, 10);
  return entity;
}
