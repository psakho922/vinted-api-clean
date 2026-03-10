import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "30d"
      }
    })
  ],
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}
