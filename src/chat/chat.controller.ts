import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Controller("messages")
export class ChatController {

  @Get()
  async getMessages(
    @Query("productId") productId: string
  ) {

    return prisma.message.findMany({
      where: { productId },
      orderBy: { createdAt: "asc" }
    });

  }

  @Post()
  async sendMessage(@Body() body: any) {

    return prisma.message.create({
      data: {
        text: body.text,
        senderId: body.senderId,
        receiverId: body.receiverId,
        productId: body.productId
      }
    });

  }

}
