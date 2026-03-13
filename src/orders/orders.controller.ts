import { Controller, Post, Body } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('orders')
export class OrdersController {

  @Post()
  async createOrder(@Body() body: any) {

    const product = await prisma.product.findUnique({
      where: { id: body.productId }
    });

    if (!product) {
      return { message: "Produit introuvable" };
    }

    const price = product.price;

    const commission = price * 0.10;

    const sellerAmount = price - commission;

    const order = await prisma.order.create({
      data: {
        productId: product.id,
        price: price,
        commission: commission,
        sellerAmount: sellerAmount
      }
    });

    return {
      message: "Commande créée",
      order
    };

  }

}
