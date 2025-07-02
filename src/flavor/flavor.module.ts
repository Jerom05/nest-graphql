import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorResolver } from './flavor.resolver';

@Module({
  providers: [FlavorResolver, FlavorService],
})
export class FlavorModule {}
