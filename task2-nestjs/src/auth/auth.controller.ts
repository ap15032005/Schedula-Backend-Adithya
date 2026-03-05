import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: { email: string }) {
    return this.authService.signup(body.email);
  }

  @Post('signin')
signin(@Body() body: { email: string }) {
  return this.authService.signin(body.email);
}
}