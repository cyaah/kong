import { Test, TestingModule } from '@nestjs/testing';
import { ServicesController } from '../services.controller';
import { ServicesService } from '../services.service';
import { Service } from '../entities/service.entity';
import { ServiceVersion } from '../entities/service-version.entity';

describe('ServicesController', () => {
  let controller: ServicesController;
  let service: ServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServicesController],
      providers: [
        {
          provide: ServicesService,
          useValue: {
            getServices: jest.fn(),
            getServiceById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ServicesController>(ServicesController);
    service = module.get<ServicesService>(ServicesService);
  });

  it('should fetch a list of services', async () => {
    const result: Service[] = [
      {
        id: 1,
        name: 'Service A',
        description: 'Handles email notifications',
        versions: [], // Include an empty array for versions to match the entity definition
      },
      {
        id: 2,
        name: 'Service B',
        description: 'Processes payment transactions',
        versions: [],
      },
    ];
    jest.spyOn(service, 'getServices').mockResolvedValue([result, 2]);

    const response = await controller.getServices('name', 'Service A', 'name', 'asc', 1, 10);
    expect(response).toEqual([result, 2]);
    expect(service.getServices).toHaveBeenCalledWith('name', 'Service A', 'name', 'asc', 1, 10);
  });

  it('should fetch a single service by ID', async () => {
    const result: Service = {
        id: 1,
        name: 'Service A',
        description: 'Handles email notifications',
        versions: [
          {
            id: 1,
            version_number: '1.0.0',
            created_at: new Date('2024-11-24T12:00:00Z'),
            service: null, // Set to null for mock purposes
          } as ServiceVersion,
          {
            id: 2,
            version_number: '1.1.0',
            created_at: new Date('2024-11-25T12:00:00Z'),
            service: null,
          } as ServiceVersion,
        ],
      };
      
    jest.spyOn(service, 'getServiceById').mockResolvedValue(result);

    const response = await controller.getServiceById(1);
    expect(response).toEqual(result);
    expect(service.getServiceById).toHaveBeenCalledWith(1);
  });
});
