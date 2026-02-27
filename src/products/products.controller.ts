import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {

  @Post()
  async create(@Body() body: any) {

    const product = await prisma.product.create({
      data: {
        title: String(body.title),
        price: Number(body.price),
        image: String(body.image),
        user: {
          connect: { id: body.userId }
        }
      },
    });

    return product;
  }

  @Get()
  async findAll() {
    return prisma.product.findMany({
      include: {
        user: true,
      },
    });
  }
}
