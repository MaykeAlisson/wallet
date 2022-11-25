import { ConfigModule, ConfigService } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'

const configService = new ConfigService();

ConfigModule.forRoot({
    envFilePath: '.env',
});

export const OrmConfig: DataSourceOptions = {
    type: 'mysql',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [],
    migrations: []
};

export default new DataSource(OrmConfig);