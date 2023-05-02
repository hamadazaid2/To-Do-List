import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { SignupDto } from './dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    // Generate (hash) the password
    dto.password = await argon.hash(dto.password);

    // Save the new user in DB

    try {
      // In signup, DTO will not add the role preoerty and delete it with whiteList
      const user = await this.userService.create({ ...dto });
      return this.signToken(user.id, user.email);
    } catch (err) {
      throw err;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    console.log(user);
    if (!user) {
      throw new NotFoundException('No user with that email!');
    }
    // Compare password
    const passMatches = await argon.verify(user.password, password);

    // If password incorrecr throw exception
    if (!passMatches) throw new ForbiddenException('Credentials incorrect!');
    // Send back the user

    return this.signToken(user.id, user.email);
  }

  async signToken(
    id: number,
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
}
