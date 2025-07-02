import { Resolver } from '@nestjs/graphql';
import { FlavorService } from './flavor.service';

@Resolver()
export class FlavorResolver {
  constructor(private readonly flavorService: FlavorService) {}
}
