import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entity/blog.entity';
import { ComponentModule } from '../component/component.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), ComponentModule],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}
