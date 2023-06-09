import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { BlogService } from './blog.service';

@ApiTags('Blog')
@Controller('')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
}
