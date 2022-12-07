import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableRulesPercentType1669666429586
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE rules_percent_type(
            id BIGINT NOT NULL auto_increment,
            type VARCHAR(8) NOT NULL,
            percent INT NOT NULL,
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
              DROP TABLE IF EXISTS rules_percent_type CASCADE; 
              `,
    );
  }
}
