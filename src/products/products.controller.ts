import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtGuard } from '../auth/guards/jwt.guard';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {

  @Get()
  async getAllProducts() {
    return prisma.product.findMany();
  }

  @UseGuards(JwtGuard)
  @Post()
  async createProduct(@Body() body: any, @Req() req: any) {

    const userId = req.user.userId;

    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),
        image: body.image,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return product;
  }
}
