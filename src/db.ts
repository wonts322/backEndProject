import { DataSource } from 'typeorm';
import { Item } from './modules/Items/model/Item';

export const createDbConnection = async (): Promise<DataSource> => {
  const appDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [Item],
    subscribers: [],
    migrations: [],
    ssl: true,
  });

  const dataSource = await appDataSource.initialize();
  return dataSource;
};

export const cleanItemsTable = async (
  dataSource: DataSource,
): Promise<void> => {
  await dataSource.getRepository(Item).clear();
};
