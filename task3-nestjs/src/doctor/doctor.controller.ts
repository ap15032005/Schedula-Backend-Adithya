import { Controller, Post, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('doctor')
@UseGuards(JwtAuthGuard)
export class DoctorController {

  constructor(private doctorService: DoctorService) {}

  @Post('profile')
  createProfile(@Req() req, @Body() body: any) {
    return this.doctorService.createProfile(req.user.userId, body);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return this.doctorService.getProfile(req.user.userId);
  }

  @Patch('profile')
  updateProfile(@Req() req, @Body() body: any) {
    return this.doctorService.updateProfile(req.user.userId, body);
  }

  @Post('availability')
  addAvailability(@Req() req, @Body() body: any) {
    return this.doctorService.addAvailability(req.user.userId, body);
  }

  @Get('availability')
  getAvailability(@Req() req) {
    return this.doctorService.getAvailability(req.user.userId);
  }

}