import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('signin')
  signin(@Body() body: any) {
    return this.authService.signin(body.email, body.password);
  }

  // GOOGLE LOGIN
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  // GOOGLE CALLBACK
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return req.user;
  }
}