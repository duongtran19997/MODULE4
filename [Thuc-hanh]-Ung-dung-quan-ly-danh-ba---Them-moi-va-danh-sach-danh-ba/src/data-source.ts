
import "reflect-metadata"

import { DataSource } from "typeorm"



export const AppDataSource = new DataSource({

    type: "mysql",

    host: "localhost",

    port: 3305,

    username: "root",

    password: "password",

    database: "company",

    synchronize: false,

    logging: false,

    entities: ["dist/src/entity/*.js"],

    migrations: ["dist/src/migrations/*.js"],

})