import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { SignupDto } from '../dto';
import { UsersService } from '../../users/services/users.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Transaction } from 'sequelize';
import { User } from 'src/modules/users/entities/users.entity';
import { UpdatedUserDto } from '../dto/update-me.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(
    dto: SignupDto,
    transaction: Transaction,
    @GetUser('id') userCreatedId?: string,
  ) {
    // Generate (hash) the password
    dto.password = await argon.hash(dto.password);
    // Save the new user in DB
    try {
      // In signup, DTO will not add the role preoerty and delete it with whiteList
      const user = await this.userService.create(
        userCreatedId,
        { ...dto },
        transaction,
      );
      const token =await this.signToken(user.id, user.email);
      return{user ,access_token: token.access_token}
    } catch (err) {
      throw err;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new ForbiddenException('Credentials incorrect!');
    }
    // Compare password
    const passMatches = await argon.verify(user.password, password);

    // If password incorrecr throw exception
    if (!passMatches) throw new ForbiddenException('Credentials incorrect!');
    // Send back the user

    return this.signToken(user.id, user.email);
  }

  async signToken(
    id: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id, // sub is a name popular in jwt means for unique subfiled
      email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }

  async updateMe(user: User, dto: UpdatedUserDto, transaction:Transaction){
    return this.userService.update(user.id, user.id, dto, transaction);
  }
  async deleteMe(user: User, transaction: Transaction){
    return this.userService.delete(user.id,user.id, transaction)
  }
}
