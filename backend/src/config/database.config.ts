import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DATABASE_CONFIG: DataSourceOptions = {
	type: 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	port: parseInt(process.env.POSTGRES_PORT || '5432'),
	username: process.env.POSTGRES_USER || 'smartmil',
	password: process.env.POSTGRES_PASSWORD || 'smartmil',
	database: process.env.POSTGRES_DB || 'smartmil',
	synchronize: false,
	logging: true,
	entities: [path.join(__dirname, '..', '**/*.entity.{js, ts}')],
	migrations: [path.join(__dirname, '..', 'migrations/*.ts')],
	ssl: false,
};

// CLI
export const dataSource: DataSource = new DataSource(DATABASE_CONFIG);
