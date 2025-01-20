import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchema } from './entities/auth.entity';
import { refreshSchema, RefreshToken } from './entities/refresh.token.schema';

@Module({
  imports:[MongooseModule.forFeature([{
    name:user.name,
    schema:userSchema
  },{
    name:RefreshToken.name,
    schema:refreshSchema
  }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
