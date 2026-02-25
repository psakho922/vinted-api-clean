
import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    return {
      message: 'User created',
      user,
    };
  }
}
