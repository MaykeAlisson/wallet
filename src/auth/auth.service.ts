import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {compareSync} from 'bcrypt'
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    let user: User
    try {
      user = await this.usersService.findByEmail(email);
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if(!isPasswordValid) return null;

    return user;

  }

  async acess(user: User){
    const payload = {
      sub: user.id,
      name: user.name
    };

    return {
      token: this.jwtService.sign(payload)
    }
  }
}
