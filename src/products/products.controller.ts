import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req
} from "@nestjs/common";

import { PrismaClient } from "@prisma/client";
import { JwtGuard } from "../auth/jwt.guard";

const prisma = new PrismaClient();

@Controller("products")
export class ProductsController {

  @Get()
  async getAll(){

    return prisma.product.findMany({
      orderBy:{
        createdAt:"desc"
      }
    });

  }

  @Get(":id")
  async getOne(@Param("id") id:string){

    return prisma.product.findUnique({
      where:{ id }
    });

  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() body:any, @Req() req:any){

    const userId = req.user.userId;

    if(!body.image){

      throw new Error("Image obligatoire");

    }

    return prisma.product.create({
      data:{
        title: body.title,
        price: Number(body.price),
        image: body.image,
        userId
      }
    });

  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  async delete(@Param("id") id:string,@Req() req:any){

    const userId = req.user.userId;

    const product = await prisma.product.findUnique({
      where:{ id }
    });

    if(product?.userId !== userId){

      return { message:"Non autorisé" };

    }

    await prisma.product.delete({
      where:{ id }
    });

    return { message:"Produit supprimé" };

  }

}
