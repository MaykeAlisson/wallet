import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableWallets1669664206011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE wallets(
        id BIGINT NOT NULL auto_increment,
        name VARCHAR(50) NOT NULL,
        max_percent_assert INT NULL,
        user_id BIGINT NOT NULL,
        create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
        )ENGINE=INNODB default charset = utf8;
     `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
       DROP TABLE IF EXISTS wallets CASCADE; 
      `,
    );
  }
}
