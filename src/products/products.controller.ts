import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { JwtGuard } from '../auth/jwt.guard';

const prisma = new PrismaClient();

@Controller('products')
export class ProductsController {

  // 🔹 GET ALL PRODUCTS
  @Get()
  async getAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // 🔹 CREATE PRODUCT (protégé par JWT)
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body: any, @Req() req: any) {

    const userId = req.user.userId;

    return prisma.product.create({
      data: {
        title: body.title,
        price: Number(body.price),
        image: body.image,
        userId: userId,
      },
    });
  }

  // 🔹 DELETE PRODUCT (seulement le propriétaire)
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @Req() req: any) {

    const userId = req.user.userId;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return { message: 'Produit introuvable' };
    }

    if (product.userId !== userId) {
      return { message: 'Non autorisé' };
    }

    await prisma.product.delete({
      where: { id }
    });

    return { message: 'Produit supprimé' };
  }
}
