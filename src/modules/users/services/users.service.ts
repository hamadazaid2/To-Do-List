import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { User } from '../entities/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { EditUserDto } from '../dto';
import { USERS_REPOSITORY } from 'src/common/constants';

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

  async create(
    userCreatedId: number,
    dto: CreateUserDto,
    transaction: Transaction,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user) throw new ConflictException('Email already exists!');
    return this.userRepository.create(
      { ...dto, role: 'user', created_by: userCreatedId },
      { transaction },
    );
  }

  async update(
    userUpdatedId: number,
    id: number,
    dto: EditUserDto,
    transaction: Transaction,
  ) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await user.update(
      {
        ...dto,
        updated_by: userUpdatedId,
        updated_at: new Date(),
      },
      { transaction },
    );

    return user;
  }

  async delete(userDeletedId: number, id: number, transaction: Transaction) {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await user.update({ deleted_by: userDeletedId }, { transaction });
    await user.destroy({ transaction });
  }
}
