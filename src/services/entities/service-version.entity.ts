import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_versions')
export class ServiceVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version_number: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Service, (service) => service.versions, { onDelete: 'CASCADE' })
  service: Service;
}
