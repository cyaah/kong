import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from '../services/entities/service.entity';
import { ServiceVersion } from '../services/entities/service-version.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Service, ServiceVersion])],
  providers: [SeedService],
})
export class SeedModule {}
