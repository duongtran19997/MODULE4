import "reflect-metadata";
import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    username: "root",
    password: "password",
    port: 3305,
    database: 'company',

    synchronize: false,

    logging: false,

    entities: ["dist/src/entity/*.js"],

    migrations: ["dist/src/migrations/*.js"],

})