import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentService } from './component.service';
import { Component } from './entity/component.entity';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Component])],
  providers: [ComponentService],
  exports: [ComponentService],
})
export class ComponentModule {}
