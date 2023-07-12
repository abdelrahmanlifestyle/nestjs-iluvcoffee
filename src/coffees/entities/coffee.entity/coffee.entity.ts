import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "../flavor.entity/flavor.entity";

@Index(['name', 'brand'])
@Entity()
export class Coffee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    description111: string;

    @Column()
    brand: string;


    @Column({ default: 0 })
    recommendations: number;

    @JoinTable()
    @ManyToMany(
        type => Flavor,
        flavor => flavor.coffees,
        {
            cascade: true
        }
    )
    flavors: Flavor[];
}