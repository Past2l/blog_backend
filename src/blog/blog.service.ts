import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entity/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}
}
