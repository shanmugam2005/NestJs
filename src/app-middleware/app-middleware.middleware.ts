import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    console.log(req.headers);
    next();
  }
}
