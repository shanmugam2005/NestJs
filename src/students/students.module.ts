import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { AppMiddlewareMiddleware } from 'src/app-middleware/app-middleware.middleware';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {
}
