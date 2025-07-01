import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from './coffee.input';

@InputType()
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) {
  @Field(() => Int)
  id: number;
}
