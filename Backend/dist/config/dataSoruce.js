"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: (process.env.DB_USER) || "postgres",
    password: (process.env.DB_PASSWORD) || "abc123$$1",
    database: (process.env.DB_NAME || "postgres"),
    entities: [
        User_1.UserData
    ],
    logging: true,
    synchronize: true
});
