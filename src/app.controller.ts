import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AppGuardGuard } from './app_guard/app_guard.guard';
@UseGuards(AppGuardGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
