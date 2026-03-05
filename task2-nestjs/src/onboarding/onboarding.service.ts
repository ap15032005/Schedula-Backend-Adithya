import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class OnboardingService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async patientOnboarding(userId: string) {

    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      return { message: "User not found" };
    }

    user.role = UserRole.PATIENT;

    await this.userRepository.save(user);

    return {
      message: "Patient onboarding completed",
      user
    };
  }
}