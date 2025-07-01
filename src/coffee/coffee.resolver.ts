import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Coffee } from './coffee.entity';
import { CreateCoffeeInput } from './coffee.input';
import { UpdateCoffeeInput } from './update-coffee.input';
import { CoffeeService } from './coffee.service';

@Resolver(() => Coffee)
export class CoffeeResolver {
  constructor(private coffeeService: CoffeeService) {}

  @Query(() => [Coffee])
  async coffees(): Promise<Coffee[]> {
    return await this.coffeeService.findAll();
  }

  @Query(() => Coffee, { nullable: true })
  coffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.findOne(id);
  }

  @Mutation(() => Coffee)
  createCoffee(@Args('createCoffeeInput') input: CreateCoffeeInput) {
    return this.coffeeService.create(input);
  }
  @Mutation(() => Coffee)
  updateCoffee(@Args('updateCoffeeInput') input: UpdateCoffeeInput) {
    return this.coffeeService.update(input);
  }

  @Mutation(() => Coffee)
  removeCoffee(@Args('id', { type: () => Int }) id: number) {
    return this.coffeeService.remove(id);
  }
}
