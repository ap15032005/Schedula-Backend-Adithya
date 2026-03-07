import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string) {
    const user = this.userRepository.create({
      email,
    });

    const savedUser = await this.userRepository.save(user);

    const token = this.jwtService.sign({
      userId: savedUser.id,
      email: savedUser.email,
    });

    return {
      message: 'User created successfully',
      token,
      user: savedUser,
    };
  }

  async signin(email: string) {

  const user = await this.userRepository.findOne({
    where: { email },
  });

  if (!user) {
    return { message: "User not found" };
  }

  const token = this.jwtService.sign({
    userId: user.id,
    email: user.email,
  });

  return {
    message: "Login successful",
    token,
    user,
  };
}
}
