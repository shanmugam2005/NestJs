import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AppGuardGuard implements CanActivate {
  constructor(private jwtService:JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request:Request=context.switchToHttp().getRequest()
    const token=this.getToken(request);
    if(!token){
      throw new UnauthorizedException("Unauthorized Person");
    }
    try{
      const paylod= this.jwtService.verify(token);
    }
    catch(err){
      Logger.error(err.message);
      throw new UnauthorizedException("Invalid Token");
    }
    return true;
  }
  private getToken(req:Request):string|undefined{
        return req.headers.authorization?.split(' ')[1];
  }
}
