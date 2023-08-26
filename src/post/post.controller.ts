import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostDto } from './dto/find-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { HistoryService } from '../history/history.service';
import { CheckPlatform } from '../common/type/platform';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly historyService: HistoryService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: number, @Req() req) {
    const post = await this.postService.get(!isNaN(id) ? id : 0);
    if (!post || (post.private && (!req.user || !req.user.private)))
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else {
      if (req.headers['x-forwarded-for'])
        await this.historyService.create({
          ip: req.headers['x-forwarded-for'],
          post_id: id,
          user_id: req.user ? req.user.id : undefined,
          platform: CheckPlatform(req.headers['user-agent']),
        });
      return post;
    }
  }

  @Get()
  async findLoggedUser(@Query() data: FindPostDto, @Req() req) {
    return this.postService.find(data, req.user && req.user.private);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() data: CreatePostDto, @Req() req) {
    if (!req.user.owner)
      throw new HttpException(
        'You do not have permission to create Post.',
        HttpStatus.UNAUTHORIZED,
      );
    return this.postService.create(data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: number, @Req() req, @Res() res) {
    if (!req.user.owner)
      throw new HttpException(
        'You do not have permission to remove Post.',
        HttpStatus.UNAUTHORIZED,
      );
    const result = await this.postService.remove(id);
    if (result.affected < 1)
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else res.sendStatus(HttpStatus.OK);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
    @Req() req,
  ) {
    if (!req.user || !req.user.owner)
      throw new HttpException(
        'You do not have permission to modify Post.',
        HttpStatus.UNAUTHORIZED,
      );
    if (!(await this.postService.get(id)))
      throw new HttpException(
        'Post with that ID does not exist.',
        HttpStatus.BAD_REQUEST,
      );
    else return this.postService.update(id, data);
  }
}
