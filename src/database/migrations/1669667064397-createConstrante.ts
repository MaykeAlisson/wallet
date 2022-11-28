import { MigrationInterface, QueryRunner } from 'typeorm';

export class createConstrante1669667064397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE wallets ADD CONSTRAINT fk_wallets_user_id FOREIGN KEY(user_id) REFERENCES users(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE rules_percent_type ADD CONSTRAINT fk_rules_percent_type_wallet_id FOREIGN KEY(wallet_id) REFERENCES wallets(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE rules_percent_category ADD CONSTRAINT fk_rules_percent_category_wallet_id FOREIGN KEY(wallet_id) REFERENCES wallets(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE rules_percent_coin ADD CONSTRAINT fk_rules_percent_coin_wallet_id FOREIGN KEY(wallet_id) REFERENCES wallets(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE rules_amount_category ADD CONSTRAINT fk_rules_amount_category_wallet_id FOREIGN KEY(wallet_id) REFERENCES wallets(id);`,
    );
    await queryRunner.query(
      `ALTER TABLE asserts ADD CONSTRAINT fk_asserts_wallet_id FOREIGN KEY(wallet_id) REFERENCES wallets(id);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE wallets DROP FOREIGN KEY fk_wallets_user_id; `,
    );
    await queryRunner.query(
      `ALTER TABLE rules_percent_type DROP FOREIGN KEY fk_rules_percent_type_wallet_id; `,
    );
    await queryRunner.query(
      `ALTER TABLE rules_percent_category DROP FOREIGN KEY fk_rules_percent_category_wallet_id; `,
    );
    await queryRunner.query(
      `ALTER TABLE rules_percent_coin DROP FOREIGN KEY fk_rules_percent_coin_wallet_id; `,
    );
    await queryRunner.query(
      ` ALTER TABLE rules_amount_category DROP FOREIGN KEY fk_rules_amount_category_wallet_id; `,
    );
    await queryRunner.query(
      `ALTER TABLE asserts DROP FOREIGN KEY fk_asserts_wallet_id;`,
    );
  }
}
