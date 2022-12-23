import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assert } from './entities/assert.entity';

@Injectable()
export class AssertsRepository {
  constructor(
    @InjectRepository(Assert)
    private readonly repository: Repository<Assert>,
  ) {}

  async findByNameAndWallet(name: string, walletId: number) {
    return await this.repository.findOneBy({ name, walletId });
  }

  async findByIdAndWallet(id: number, walletId: number) {
    return this.repository.findOneBy({ id, walletId });
  }

  async findByWallet(walletId: number) {
    return this.repository.findBy({ walletId });
  }

  async save(assert: Assert) {
    this.repository.create(assert);
    return this.repository.save(assert);
  }

  async delete(assert: Assert) {
    return this.repository.delete(assert);
  }
}
