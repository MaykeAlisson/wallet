import { isEmpty } from "class-validator";
import { Wallet } from "../entities/wallet.entity";
import { UpdateWalletDto } from "../dto/update-wallet.dto";

export function nvl(entity: Wallet, dto: UpdateWalletDto) : Wallet{
    entity.name = isEmpty(dto.name) ? entity.name : dto.name;
    entity.maxPecentAssert = isEmpty(dto.max_pecent_assert) ? entity.maxPecentAssert : dto.max_pecent_assert;
    return entity;
}