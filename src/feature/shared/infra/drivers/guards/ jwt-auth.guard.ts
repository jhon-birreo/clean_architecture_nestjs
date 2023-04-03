import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
	//TODO Validar los permiso de roles aqui
}
