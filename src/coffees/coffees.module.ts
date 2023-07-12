import { Injectable, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';


@Injectable()
export class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe']
    }
}

class configService { }
class devConfigService { }
class prodConfigService { }

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
    controllers: [CoffeesController],
    providers: [
        CoffeesService,
        CoffeeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (connection: Connection): Promise<string[]> => {
                // const coffeeBrands = await connection.query('SELECT * ...');
                const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
                console.log('[!] Async factory')
                return coffeeBrands;
            },
            inject: [CoffeeBrandsFactory]
        },
        {
            provide: configService,
            useValue: process.env.Node_ENV === 'developement'
                ? devConfigService
                : prodConfigService
        }

    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }
