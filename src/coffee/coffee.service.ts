// coffee.service.ts
import { Injectable } from '@nestjs/common';
import { Coffee } from './coffee.entity';
import { CreateCoffeeInput } from './coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCoffeeInput } from './update-coffee.input';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  findOne(id: number): Promise<Coffee | null> {
    return this.coffeeRepository.findOneBy({ id });
  }

  create(input: CreateCoffeeInput): Promise<Coffee> {
    const coffee = this.coffeeRepository.create(input);
    return this.coffeeRepository.save(coffee);
  }

  async update(updateInput: UpdateCoffeeInput): Promise<Coffee> {
    const coffee = await this.coffeeRepository.preload(updateInput);
    if (!coffee) throw new Error('Coffee not found');
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    if (!coffee) {
      throw new Error('Coffee not found');
    }
    return this.coffeeRepository.remove(coffee);
  }
}
