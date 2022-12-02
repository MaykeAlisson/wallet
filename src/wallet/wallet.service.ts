import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { nvl } from './provider/wallet.nvl';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
  ) {}

  async create(userId: number, createWalletDto: CreateWalletDto) {
    const entity = new Wallet();
    entity.name = createWalletDto.name;
    entity.maxPecentAssert = createWalletDto.max_pecent_assert;
    entity.userId = userId;
    entity.created = new Date();

    this.walletRepository.create(entity);

    const save = await this.walletRepository.save(entity);

    createWalletDto.id = save.id;

    return createWalletDto;
  }

  async findAll(userId: number) {
    const query = await this.walletRepository.findBy({ userId });
    return query;
  }

  async findOne(userId: number, id: number) {
    const wallet = this.findByIdAndUser(id, userId);
    return wallet;
  }

  async update(id: number, updateWalletDto: UpdateWalletDto, userId: number) {
    const wallet = await this.findByIdAndUser(id, userId);
    const entity = this.walletRepository.create(nvl(wallet, updateWalletDto));

    await this.walletRepository.save(entity);

    updateWalletDto.id = entity.id;
    updateWalletDto.name = entity.name;
    updateWalletDto.max_pecent_assert = entity.maxPecentAssert;

    return updateWalletDto;
  }

  async remove(id: number, userId: number) {
    const wallet = await this.findByIdAndUser(id, userId);
    await this.walletRepository.delete(wallet);
    return {};
  }

  async findByIdAndUser(id: number, userId: number) {
    const wallet = await this.walletRepository.findOneBy({ id, userId });
    if (!wallet)
      throw new NotFoundException(
        `not register wallet whith id ${id} and userId ${userId}`,
      );
    return wallet;
  }
}
