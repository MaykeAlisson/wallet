import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1669658422065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE TABLE users(
      id BIGINT NOT NULL auto_increment,
      name VARCHAR(70) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      create_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
      )ENGINE=INNODB default charset = utf8;
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE IF EXISTS users CASCADE; 
        `,
    );
  }
}
