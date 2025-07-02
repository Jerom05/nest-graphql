import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class CreateCoffeeInput {
  @Field()
  @IsString()
  @Length(2, 30)
  name: string;

  @Field()
  @IsString()
  brand: string;

  @Field(() => [String])
  flavors: string[];
}
