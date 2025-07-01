import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCoffeeInput {
  @Field()
  name: string;

  @Field()
  brand: string;

  @Field(() => [String])
  flavors: string[];
}
