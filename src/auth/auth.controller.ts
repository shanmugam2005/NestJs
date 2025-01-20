import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user } from './entities/auth.entity';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post('signup')
    async signup(@Body() student:CreateAuthDto){
        return this.authService.signup(student);
    }
    @Post('login')
    async login(@Body()student:LoginDto){
      return this.authService.login(student);
    }
}
