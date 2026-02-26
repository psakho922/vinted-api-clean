import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'SUPER_SECRET_KEY_CHANGE_ME',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
