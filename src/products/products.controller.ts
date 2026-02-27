@Post()
async create(@Body() body: any) {
  const product = await prisma.product.create({
    data: {
      title: body.title,
      price: parseFloat(body.price),
      image: body.image,
      userId: body.userId,
    },
  });

  return product;
}



