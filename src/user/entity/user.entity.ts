import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../common/user.enum';

@Entity('user')
export class User {
  @ApiProperty({ description: 'User UUID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Account Type' })
  @Column({ type: 'enum', enum: UserType, default: UserType.EMAIL })
  type: UserType;

  @ApiProperty({ description: 'E-Mail' })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({ description: 'Password' })
  @Column({ nullable: true })
  password?: string;

  @ApiProperty({ description: 'Nickname' })
  @Column({ nullable: false, unique: true })
  nickname: string;

  @ApiProperty({ description: 'User Picture' })
  @Column({ nullable: true })
  picture?: string;

  @ApiProperty({ description: 'Account Created' })
  @CreateDateColumn()
  created: Date;

  @ApiProperty({ description: 'Account Last Edited' })
  @UpdateDateColumn()
  updated: Date;
}
