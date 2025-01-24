import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AtmModuleService } from './atm-module.service';
import { console } from 'inspector';

@Controller('atm-module')
export class AtmModuleController {
    constructor(private atmService:AtmModuleService){}
    @Get()
    create(){
        this.atmService.startMachine();
    }
    @Get("pinEntered")
    getPin(){
        this.atmService.getPin();
    }
    @Post("pinCheck")
    pinCheck(@Body('pin') pin:string ,@Query('type') type:string){
           this.atmService.pinCheck(pin,type);
    }   
}
