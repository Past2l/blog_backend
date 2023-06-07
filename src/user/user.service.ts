import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async find(option: FindUserDto): Promise<User[]> {
    const { id, nickname, email, page = 1, count = 5, sort = 'ASC' } = option;
    return await this.userRepository.find({
      order: { created: sort },
      where: { id, nickname, email },
      skip: (page - 1) * count,
      take: count,
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async update(id: string, data: UpdateUserDto): Promise<UpdateResult> {
    return await this.userRepository.update({ id }, data);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ id });
  }
}
