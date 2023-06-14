import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Component } from '../../component/entity/component.entity';

@Entity('blog')
export class Blog {
  @ApiProperty({ description: 'Blog Post UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Blog Post Title' })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ description: 'Blog Post Component' })
  @ManyToMany(() => Component, {
    cascade: ['remove'],
  })
  @JoinTable()
  component: Component[];

  @ApiProperty({ description: 'Blog Post Tag' })
  @Column({ nullable: false })
  tag: string;

  @ApiProperty({ description: 'Blog Post Created' })
  @CreateDateColumn()
  created: Date;

  @ApiProperty({ description: 'Blog Post Updated' })
  @UpdateDateColumn()
  updated: Date;
}
