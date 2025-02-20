require('dotenv').config();
import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';
import { DataSource } from 'typeorm';
import { cleanItemsTable, createDbConnection } from './db';

const getServer = (dataSource: DataSource, host: string, port: number) => {
  const server = Hapi.server({
    host,
    port,
  });

  defineRoutes(server, dataSource);

  return server;
};

export const initializeServer = async () => {
  const dataSource = await createDbConnection();
  await cleanItemsTable(dataSource); // cleaning it so the tests pass

  const serverHost = 'localhost';
  const serverPort = 5432;
  const server = getServer(dataSource, serverHost, serverPort);
  await server.initialize();
  return server;
};

export const startServer = async () => {
  const dataSource = await createDbConnection();

  const serverHost = '0.0.0.0';
  const serverPort = 3000;
  const server = getServer(dataSource, serverHost, serverPort);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
};
