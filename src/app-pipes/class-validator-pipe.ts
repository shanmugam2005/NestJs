
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';


@Injectable()
export class studentCheck implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {

      const errors=await validate(value)     
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

      return value;
  }
}
