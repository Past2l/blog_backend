import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { UserType } from '../common/user.enum';
import { Unique } from 'typeorm';
import { User } from '../entity/user.entity';

export class GetUserDto {
  @ApiProperty({
    description: 'Account Type',
    example: 'email',
    required: true,
  })
  @IsEnum(UserType)
  type: UserType;

  @ApiProperty({
    description: 'E-Mail',
    example: 'admin@example.com',
    required: true,
  })
  @IsString()
  @Validate(Unique, [User])
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '12345678',
    required: false,
    minimum: 8,
    maximum: 32,
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Nickname',
    example: '파스텔톤연두색',
    required: true,
    minimum: 2,
    maximum: 16,
  })
  @IsString()
  @Length(2, 16)
  nickname: string;

  @ApiProperty({
    description: 'User Picture',
    example: 'https://example.com/example.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  picture?: string;
}
