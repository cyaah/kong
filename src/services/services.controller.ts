import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getServices(
    @Query('filterField') filterField?: string,
    @Query('filterValue') filterValue?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.servicesService.getServices(filterField, filterValue, sortBy, order, page, limit);
  }

  @Get(':id')
  async getServiceById(@Param('id') id: number) {
    return this.servicesService.getServiceById(id);
  }
}
