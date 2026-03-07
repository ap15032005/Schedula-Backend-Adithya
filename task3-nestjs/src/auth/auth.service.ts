import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {

    const existing = await this.userRepository.findOne({
      where: { email },
    });

    if (existing) {
      return { message: 'Email already exists' };
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const token = this.jwtService.sign({
      userId: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    });

    return {
      message: 'User created successfully',
      token,
      user: savedUser,
    };
  }

  async signin(email: string, password: string) {

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    // COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { message: 'Invalid password' };
    }

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      token,
      user,
    };
  }
}