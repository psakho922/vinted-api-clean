import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {

  @Post()
  async create(@Body() body: any) {
    try {
      const product = await prisma.product.create({
        data: {
          title: body.title,
          price: parseFloat(body.price),
          image: body.image,
          userId: body.userId,
        },
      });

      return product;
    } catch (error) {
      console.error(error);
      return { error: "Erreur création produit" };
    }
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


