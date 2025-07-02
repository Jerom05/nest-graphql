// coffee.service.ts
import { Injectable } from '@nestjs/common';
import { Coffee } from './coffee.entity';
import { CreateCoffeeInput } from './coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { UpdateCoffeeInput } from './update-coffee.input';
import { Flavor } from 'src/flavor/flavor.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepo: Repository<Flavor>,
  ) {}

  findAll(): Promise<Coffee[]> {
    return this.coffeeRepository.find();
  }

  findOne(id: number): Promise<Coffee | null> {
    return this.coffeeRepository.findOneBy({ id });
  }

  async create(input: CreateCoffeeInput): Promise<Coffee> {
    const flavors = await Promise.all(
      input.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({ ...input, flavors });
    return this.coffeeRepository.save(coffee);
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existing = await this.flavorRepo.findOne({ where: { name } });
    if (existing) return existing;

    return this.flavorRepo.create({ name });
  }
  
  async update(updateInput: UpdateCoffeeInput): Promise<Coffee | null> {
    const coffeeInput: DeepPartial<Coffee> = {
      ...updateInput,
      flavors: (updateInput.flavors ?? []).map(
        (flavorName) => ({ name: flavorName }) as Flavor,
      ),
    };
    const coffee = await this.coffeeRepository.preload(coffeeInput);
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
