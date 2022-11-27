import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export default class UsersRepository {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

    save(user: User){
        return this.userRepository.save(user)
    }
}