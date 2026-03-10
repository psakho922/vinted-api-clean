import {
  CanActivate,
  ExecutionContext,
  Injectable
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(private jwt: JwtService) {}

  canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();

    const auth = request.headers.authorization;

    if(!auth){

      throw new Error("Token manquant");

    }

    const token = auth.split(" ")[1];

    try{

      const decoded = this.jwt.verify(token);

      request.user = decoded;

      return true;

    }catch{

      throw new Error("Token invalide");

    }

  }

}
