import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {
  @Get()
  async getAll() {
    return prisma.product.findMany({
      include: {
        user: true,
      },
    });
  }

  @Post()
  async create(@Body() body: any, @Req() req: any) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token manquant');
    }

    const token = authHeader.split(' ')[1];

    let decoded: any;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (err) {
      throw new UnauthorizedException('Token invalide');
    }

    const userId = decoded.userId;

    return prisma.product.create({
      data: {
        title: body.title,
        price: body.price,
        image: body.image,
        userId: userId,
      },
    });
  }
}

