import { isEmpty } from 'class-validator';
import { UpdateAssertDto } from '../dto/update-assert.dto';
import { Assert } from '../entities/assert.entity';

export function nvl(entity: Assert, dto: UpdateAssertDto): Assert {
  entity.name = isEmpty(dto.name) ? entity.name : dto.name.toUpperCase();
  entity.category = isEmpty(dto.category) ? entity.category : dto.category;
  entity.type = isEmpty(dto.type) ? entity.type : dto.type;
  entity.coin = isEmpty(dto.coin) ? entity.coin : dto.coin;
  entity.price = isEmpty(dto.price) ? entity.price : dto.price;
  entity.amount = isEmpty(dto.amount) ? entity.amount : dto.amount;
  entity.averagePrice = isEmpty(dto.averagePrice)
    ? entity.averagePrice
    : dto.averagePrice;
  entity.investedAmount = isEmpty(dto.investedAmount)
    ? entity.investedAmount
    : dto.investedAmount;
  return entity;
}
