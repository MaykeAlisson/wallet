import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableAsserts1669666936812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE asserts(
            id BIGINT NOT NULL auto_increment,
            name VARCHAR(50) NOT NULL,
            category VARCHAR(10) NOT NULL,
            type VARCHAR(8) NOT NULL,
            coin VARCHAR(10) NOT NULL,
            amount INT NULL,
            price DECIMAL(15, 2) NULL,
            average_price DECIMAL(15, 2) NULL,
            invested_amount DECIMAL(15, 2) NULL,
            wallet_id BIGINT NOT NULL,
            create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
            )ENGINE=INNODB default charset = utf8;
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            DROP TABLE IF EXISTS asserts CASCADE; 
            `,
    );
  }
}
