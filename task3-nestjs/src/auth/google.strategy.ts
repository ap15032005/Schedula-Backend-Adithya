import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '1067875526169-oivgh0fptk46nsptlafqkl8976rk1mt.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/api/v1/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      email: profile.emails?.[0]?.value,
      googleId: profile.id,
      name: profile.displayName,
    };
  }
}