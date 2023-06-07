import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiOperation({
    summary: '유저 조회',
    description: '유저 UUID를 이용하여 유저를 조회합니다.',
  })
  @ApiOkResponse({
    description: '유저 UUID를 이용하여 유저 정보를 출력합니다.',
    type: GetUserDto,
  })
  @ApiBadRequestResponse({ description: '유저 정보가 없는 경우 발생합니다.' })
  @ApiParam({ name: 'id', required: true, description: '유저 UUID' })
  async get(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    if (user) return { user };
    else
      throw new HttpException(
        'User information not found.',
        HttpStatus.BAD_REQUEST,
      );
  }
}
