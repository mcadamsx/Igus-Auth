import { DataSource } from "typeorm";
import { UserData } from '../entities/User';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: (process.env.DB_USER) || "postgres",
    password: (process.env.DB_PASSWORD) || "abc123$$1",
    database: (process.env.DB_NAME || "postgres"),
    entities:[
      UserData
    ],
    logging: true,
    synchronize: true
});
