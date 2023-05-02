import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  create(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  async update(id: number, dto: EditUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await user.update(dto);

    return user;
  }

  async delete(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await user.destroy();
  }
}
