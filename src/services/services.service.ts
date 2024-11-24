import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async getServices(
    filterField?: string,
    filterValue?: string,
    sortBy: string = 'name',
    order: 'asc' | 'desc' = 'asc',
    page: number = 1,
    limit: number = 10,
  ) {
    const query = this.serviceRepository.createQueryBuilder('service');
  
    // Filtering
    if (filterField && filterValue) {
      query.where(`service.${filterField} LIKE :value`, { value: `%${filterValue}%` });
    }
  
    // Sorting
    const sortOrder: 'ASC' | 'DESC' = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
    query.orderBy(`service.${sortBy}`, sortOrder);
  
    // Pagination
    query.skip((page - 1) * limit).take(limit);
  
    return query.getManyAndCount();
  }
  

  async getServiceById(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
      relations: ['versions'],
    });
  }
}
