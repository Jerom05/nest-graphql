import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ManyToMany, JoinTable } from 'typeorm';
import { Flavor } from 'src/flavor/flavor.entity';

@Entity()
@ObjectType()
export class Coffee {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  brand: string;

  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: true,
  })
  @JoinTable()
  @Field(() => [Flavor])
  flavors: Flavor[];
}
