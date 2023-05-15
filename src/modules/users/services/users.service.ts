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
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_REPOSITORY) private userRepository: typeof User) {}

  async findAll() {
    return await this.userRepository.scope('withoutPassword').findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.scope('withoutPassword').findByPk(id);
    if (!user) throw new NotFoundException('No user founded!');

    return user;
  }

  async findByEmail(email: string, withPassword: boolean = false) {
    const user = withPassword ? await this.userRepository.findOne({ where: { email } }) :
      await this.userRepository.scope('withoutPassword').findOne({ where: { email } });
    return user;
  }

  async create(
    userCreatedId: string,
    dto: CreateUserDto,
    transaction: Transaction
  ) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (user) throw new ConflictException('Email already exists!');


    const newUser = await this.userRepository.scope('withoutPassword').create(
      { ...dto, createdBy: userCreatedId},
      { transaction },
    );

    if(newUser.createdBy === null){
      newUser.createdBy = newUser.id;
      newUser.update({createdBy: newUser.id},{transaction});
    }

    newUser.createdBy = String(
      newUser.createdBy === null ? newUser.createdBy : newUser.id,
    );
    return newUser;
  }

  async update(
    userUpdatedId: string,
    id: string,
    dto: EditUserDto,
    transaction: Transaction,
  ) {
    const user = await this.userRepository.scope('withoutPassword').findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await user.update(
      {
        ...dto,
        updatedBy: userUpdatedId,
        updatedAt: new Date(),
      },
      { transaction },
    );

    return user;
  }

  
  async updatedPassword (userUpdatedId: string, id: string, passowrd:string, transaction: Transaction){
    const user = await this.findOne(id);

    const pass = await argon.hash(passowrd);

    await user.update(
      {
        password: pass,
        updatedBy: userUpdatedId,
        updatedAt: new Date(),
      },
      { transaction },
    );
    return user;
  }


  async delete(userDeletedId: string, id: string, transaction: Transaction) {
    const user = await this.userRepository.scope('withoutPassword').findByPk(id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    await user.update({ deletedBy: userDeletedId }, { transaction });
    await user.destroy({ transaction });
  }
}
