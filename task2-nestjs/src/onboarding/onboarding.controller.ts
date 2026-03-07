import { Body, Controller, Post } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';

@Controller('api/v1/onboarding')
export class OnboardingController {

  constructor(private onboardingService: OnboardingService) {}

  @Post('patient')
  patient(@Body() body: { userId: string }) {
    return this.onboardingService.patientOnboarding(body.userId);
  }

}