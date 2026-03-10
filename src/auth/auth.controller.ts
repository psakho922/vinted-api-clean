import { Body, Controller, Post } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

@Controller("auth")
export class AuthController {

  constructor(private jwt: JwtService) {}

  @Post("register")
  async register(@Body() body: any) {

    const hashed = await bcrypt.hash(body.password,10);

    const user = await prisma.user.create({
      data:{
        email: body.email,
        password: hashed,
        name: body.name
      }
    });

    return {
      message:"User created",
      user
    };

  }

  @Post("login")
  async login(@Body() body: any) {

    const user = await prisma.user.findUnique({
      where:{
        email: body.email
      }
    });

    if(!user){

      return { message:"User not found" };

    }

    const valid = await bcrypt.compare(body.password,user.password);

    if(!valid){

      return { message:"Password incorrect" };

    }

    const token = this.jwt.sign({
      userId: user.id,
      email: user.email
    });

    return {
      access_token: token
    };

  }

}
