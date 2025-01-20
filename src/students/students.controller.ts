import { Controller, Get ,Req,All, Param, Post, Body, ParseIntPipe, UsePipes, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { StudentsService } from './students.service';
import { schema, studentsSchema } from 'src/app-pipes/Z-Schema';
import { AppPipesPipe } from 'src/app-pipes/app-pipes.pipe';
import { studentSchema } from 'src/app-pipes/class-validator';
import { studentCheck } from 'src/app-pipes/class-validator-pipe';
import { AppGuardGuard } from 'src/app_guard/app_guard.guard';

@Controller('students')
export class StudentsController {
    
    constructor(private readonly students:StudentsService){}
    @Get()
    @UseGuards(AppGuardGuard)
    index():object{
        return this.students.findAll()
    }

    @All()
    All():string{
        return "Welcome";
    }
    @Get(':id')
     findAll(@Param('id',ParseIntPipe) id:number):string{
        return "hi hello";
    }
    
    @Post('create')
    async create(@Body()student:studentSchema){
        console.log("Success")
        this.students.create(student)
    }

}
