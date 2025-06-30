import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Coffee } from './coffee.entity';
import { CreateCoffeeInput } from './coffee.input';
import { CoffeeService } from './coffee.service';

@Resolver(() => Coffee)
export class CoffeeResolver {
  constructor(private coffeeService: CoffeeService) {}

  @Query(() => [Coffee])
  coffees(): Coffee[] {
    return this.coffeeService.findAll();
  }

  @Query(() => Coffee, { nullable: true })
  coffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee)
  createCoffee(@Args('createCoffeeInput') input: CreateCoffeeInput) {
    return this.coffeeService.create(input);
  }
}
