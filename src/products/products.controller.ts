import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {

  @Post()
  async createProduct(@Body() body: any) {

    const product = await prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),
        imageUrl: body.imageUrl,
        user: {
          connect: {
            id: body.userId,
          },
        },
      },
    });

    return product;
  }
}

