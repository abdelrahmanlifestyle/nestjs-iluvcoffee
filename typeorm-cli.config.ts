import { Coffee } from "src/coffees/entities/coffee.entity/coffee.entity";
import { Flavor } from "src/coffees/entities/flavor.entity/flavor.entity";
import { CoffeeRefactor1689162681455 } from "src/migrations/1689162681455-CoffeeRefactor";
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    entities: [Coffee, Flavor],
    migrations: [CoffeeRefactor1689162681455],
});