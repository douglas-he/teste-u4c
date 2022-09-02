import "reflect-metadata";
require('dotenv').config();
const Hapi = require('@hapi/hapi');
import { DataSource } from "typeorm";
import { userRoutes, vehicleRoutes, incidentsRoutes } from './routes';

import * as Entities from "./entity";

const {
  HOST,
  DB_PORT,
  DB,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: HOST,
  port: DB_PORT as any,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB,
  entities: Entities,
  synchronize: true,
})

AppDataSource.initialize()
  .catch((error) => console.log(error));

const server = Hapi.server({
  port:  process.env.PORT || 'localhost',
  host: process.env.HOST || '3000',
});
server.route([...userRoutes, ...vehicleRoutes, ...incidentsRoutes]);

const init = async () => {
    await server.start();
    console.log('Server running on %ss', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();

module.exports = server;