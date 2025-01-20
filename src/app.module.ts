import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AppMiddlewareMiddleware } from './app-middleware/app-middleware.middleware';
import { cats } from './app-middleware/cats.middleware';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports: [StudentsModule, AuthModule,JwtModule.register({global:true,secret:process.env.SECRET}) ,MongooseModule.forRoot(process.env.MONGOURL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(cats)
      .forRoutes('')
  }
}
