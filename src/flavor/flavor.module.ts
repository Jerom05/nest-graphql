import { Module } from '@nestjs/common';
import { Coffee } from 'src/coffee/coffee.entity';
import { Flavor } from './flavor.entity';
import { FlavorService } from './flavor.service';
import { FlavorResolver } from './flavor.resolver';

@Module({
  imports: [Coffee, Flavor],
  providers: [FlavorResolver, FlavorService],
})
export class FlavorModule {}
