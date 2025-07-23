import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CoffeeResolver } from './coffee/coffee.resolver';
import { CoffeeService } from './coffee/coffee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffee/coffee.entity';
import { Flavor } from './flavor/flavor.entity';
import { FlavorModule } from './flavor/flavor.module';
import { DateScalar } from './common/scalars/date.scalar/date.scalar';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 4050,
      username: 'user',
      password: 'user',
      database: 'graphql',
      entities: [Coffee, Flavor],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Coffee, Flavor]),
    FlavorModule,
  ],
  providers: [CoffeeResolver, CoffeeService, DateScalar],
})
export class AppModule {}
