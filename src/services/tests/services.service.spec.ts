import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from '../services.service';
import { Service } from '../entities/service.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('ServicesService', () => {
  let service: ServicesService;

  const mockServiceRepository = {
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn().mockResolvedValue([[{ id: 1, name: 'Service A' }], 1]),
    })),
    findOne: jest.fn().mockResolvedValue({ id: 1, name: 'Service A' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: mockServiceRepository,
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
  });

  it('should fetch a list of services', async () => {
    const result = await service.getServices('name', 'Service A', 'name', 'asc', 1, 10);
    expect(result).toEqual([[{ id: 1, name: 'Service A' }], 1]);
    expect(mockServiceRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should fetch a single service by ID', async () => {
    const result = await service.getServiceById(1);
    expect(result).toEqual({ id: 1, name: 'Service A' });
    expect(mockServiceRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      relations: ['versions'],
    });
  });
});
