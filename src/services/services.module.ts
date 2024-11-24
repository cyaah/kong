import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { ServiceVersion } from './entities/service-version.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, ServiceVersion]), // Register entities for this module
  ],
  controllers: [ServicesController], // Include the controller for handling HTTP routes
  providers: [ServicesService], // Include the service for business logic
  exports: [ServicesService], // Export the service if other modules need to use it
})
export class ServicesModule {}
