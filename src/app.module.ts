import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './database/seed.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'kong',
      password: 'kong',
      database: 'kong',
      autoLoadEntities: true,
      synchronize: true, // Enable this only in development
    }),
    ServicesModule,
    SeedModule,
  ],
})
export class AppModule {}
