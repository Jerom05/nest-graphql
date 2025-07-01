import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

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

  @Column('text', { array: true })
  @Field(() => [String])
  flavors: string[];
}
