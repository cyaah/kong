import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../services/entities/service.entity';
import { ServiceVersion } from '../services/entities/service-version.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ServiceVersion)
    private readonly versionRepository: Repository<ServiceVersion>,
  ) {}

  async seed() {
    await this.clearDatabase();

    // Add mock data for services
    const services = [
      { name: 'Service A', description: 'Handles email notifications' },
      { name: 'Service B', description: 'Processes payment transactions' },
      { name: 'Service C', description: 'Manages user authentication' },
      { name: 'Service D', description: 'Provides analytics' },
      { name: 'Service E', description: 'Handles real-time messaging' },
    ];

    const savedServices = await this.serviceRepository.save(services);

    // Add mock versions for each service
    const versions = savedServices.flatMap((service, index) => [
      { version_number: `${1 + index}.0.0`, service },
      { version_number: `${1 + index}.1.0`, service },
      { version_number: `${1 + index}.2.0`, service },
    ]);

    await this.versionRepository.save(versions);

    console.log('Database seeded successfully with additional mock data!');
  }

  private async clearDatabase() {
    const queryRunner = this.serviceRepository.manager.connection.createQueryRunner();
    await queryRunner.query('TRUNCATE TABLE "service_versions" CASCADE');
    await queryRunner.query('TRUNCATE TABLE "services" CASCADE');
  }
}
