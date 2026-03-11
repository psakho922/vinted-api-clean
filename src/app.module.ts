import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    ChatModule
  ],
})
export class AppModule {}
