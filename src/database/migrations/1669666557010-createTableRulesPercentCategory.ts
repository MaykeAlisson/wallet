import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableRulesPercentCategory1669666557010
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE rules_percent_category(
            id BIGINT NOT NULL auto_increment,
            category VARCHAR(10) NOT NULL,
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
            DROP TABLE IF EXISTS rules_percent_category CASCADE; 
            `,
    );
  }
}
