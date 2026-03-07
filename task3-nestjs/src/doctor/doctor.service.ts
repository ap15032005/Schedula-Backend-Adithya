import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Availability)
    private availabilityRepo: Repository<Availability>,
  ) {}

  // Doctor Profile
  createProfile(userId: string, body: any) {
    return {
      message: "Doctor profile created",
      userId,
      data: body
    };
  }

  getProfile(userId: string) {
    return {
      message: "Doctor profile fetched",
      userId
    };
  }

  updateProfile(userId: string, body: any) {
    return {
      message: "Doctor profile updated",
      userId,
      data: body
    };
  }

  // Create Availability
  async addAvailability(userId: string, body: any) {

    const availability = this.availabilityRepo.create({
  doctorId: userId,
  dayOfWeek: body.dayOfWeek,
  startTime: body.startTime,
  endTime: body.endTime
});

    await this.availabilityRepo.save(availability);

    return {
      message: "Availability slot created",
      availability
    };
  }

  // Get Availability
  async getAvailability(userId: string) {

    const slots = await this.availabilityRepo.find({
      where: { doctorId: userId }
    });

    return {
      message: "Doctor availability fetched",
      slots
    };
  }

  // Delete Availability
  async deleteAvailability(id: string) {

    await this.availabilityRepo.delete({ id });

    return {
      message: "Availability slot deleted"
    };
  }

}