import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Component } from './entity/component.entity';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(Component)
    private readonly componentRepository: Repository<Component>,
  ) {}

  async create(data: CreateComponentDto): Promise<Component> {
    const newComponent = this.componentRepository.create(data);
    return await this.componentRepository.save(newComponent);
  }

  async findById(id: string): Promise<Component | null> {
    return await this.componentRepository.findOneBy({ id });
  }

  async update(id: string, data: UpdateComponentDto): Promise<UpdateResult> {
    return await this.componentRepository.update({ id }, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.componentRepository.delete({ id });
  }
}
