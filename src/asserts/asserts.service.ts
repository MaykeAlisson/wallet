import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletService } from 'src/wallet/wallet.service';
import { Repository } from 'typeorm';
import { CreateAssertDto } from './dto/create-assert.dto';
import { UpdateAssertDto } from './dto/update-assert.dto';
import { Assert } from './entities/assert.entity';
import { nvl } from './provider/assert.nvl';

@Injectable()
export class AssertsService {
  constructor(
    private readonly walletService: WalletService,
    @InjectRepository(Assert)
    private readonly repository: Repository<Assert>,
  ) {}

  async create(userId: number, walletId: number, dto: CreateAssertDto) {
    await this.walletService.findByIdAndUser(walletId, userId);
    await this.existAssert(dto.name.toUpperCase(), walletId);
    const entity = new Assert();
    entity.name = dto.name.toUpperCase();
    entity.category = dto.category;
    entity.type = dto.type;
    entity.coin = dto.coin;
    entity.price = 0;
    entity.averagePrice = 0;
    entity.investedAmount = 0;
    entity.amount = 0;
    entity.walletId = walletId;
    entity.created = new Date();
    this.repository.create(entity);
    const assert = await this.repository.save(entity);
    return assert;
  }

  async findAll(userId: number, walletId: number) {
    await this.walletService.findByIdAndUser(walletId, userId);
    return this.repository.findBy({ walletId });
  }

  async findOne(userId: number, walletId: number, id: number) {
    await this.walletService.findByIdAndUser(walletId, userId);
    return this.findByIdAndWallet(id, walletId);
  }

  async update(
    userId: number,
    walletId: number,
    id: number,
    updateAssertDto: UpdateAssertDto,
  ) {
    await this.walletService.findByIdAndUser(walletId, userId);
    const entity = await this.findByIdAndWallet(id, walletId);
    const assert = nvl(entity, updateAssertDto);
    await this.existAssert(assert.name, walletId, id);
    this.repository.create(assert);
    return this.repository.save(assert);
  }

  async remove(userId: number, walletId: number, id: number) {
    await this.walletService.findByIdAndUser(walletId, userId);
    const entity = await this.findByIdAndWallet(id, walletId);
    await this.repository.delete(entity);
    return {};
  }

  private async existAssert(name: string, walletId: number, id?: number) {
    const result = await this.repository.findOneBy({ name, walletId });
    if (result) {
      if (id && Number(result.id) === id) return;

      throw new BadRequestException(
        `assert with the name ${name} already exists in the wallet`,
      );
    }
  }

  private async findByIdAndWallet(id: number, walletId: number) {
    const result = await this.repository.findOneBy({ id, walletId });
    if (!result)
      throw new NotFoundException(
        `not found assert ${id} for wallet ${walletId}`,
      );
    return result;
  }
}
