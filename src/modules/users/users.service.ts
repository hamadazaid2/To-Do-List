import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto';
import { USERS_REPOSITORY } from '../common/constants/constant';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private userRepository: typeof User) {}

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException('No user founded!');

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user.first_name) throw new ConflictException('Email already exists!');
    return this.userRepository.create(dto);
  }

  async update(id: number, dto: EditUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await user.update(dto);

    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await user.destroy();
  }
}
