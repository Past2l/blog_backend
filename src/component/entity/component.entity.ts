import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ComponentType } from '../common/component.enum';

@Entity('component')
export class Component {
  @ApiProperty({ description: 'Blog Post Component UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Blog Post Component Type' })
  @Column({ type: 'enum', enum: ComponentType, nullable: false })
  type: ComponentType;

  @ApiProperty({ description: 'Blog Post Component Data' })
  @Column({ nullable: false, type: 'text' })
  content: string;
}
