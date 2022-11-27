import { MigrationInterface, QueryRunner } from "typeorm"

export class createTableUser1669538454235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE users(
                id BIGINT NOT NULL auto_increment,
                name VARCHAR(70) NOT NULL,
                email VARCHAR(100) NOT NULL unique,
                password VARCHAR(100) NOT NULL,
                create_at DATETIME NOT NULL default CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
                )default charset = utf8;
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DROP TABLE IF EXISTS users CASCADE; 
            `
        )
    }

}
