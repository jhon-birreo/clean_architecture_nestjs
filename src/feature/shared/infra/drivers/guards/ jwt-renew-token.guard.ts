import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTReNewTokenGuard extends AuthGuard('jwt') {
	//TODO Validar los permiso de roles aqui
}
