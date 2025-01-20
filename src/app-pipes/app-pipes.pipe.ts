import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class AppPipesPipe implements PipeTransform {
  constructor(private schema:ZodSchema){}
  transform(value: any, metadata: ArgumentMetadata) {
    try{
        console.log(value);
        const parseValue=this.schema.parse(value);
        return parseValue;
    }
    catch(err){
      throw new BadRequestException("Error");
    }
  }
}
