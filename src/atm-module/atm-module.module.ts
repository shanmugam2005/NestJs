import { Module } from '@nestjs/common';
import { AtmModuleController } from './atm-module.controller';
import { AtmModuleService } from './atm-module.service';
import { XstateService } from 'src/xstate/xstate.service';
import { XstateModule } from 'src/xstate/xstate.module';

@Module({
  controllers: [AtmModuleController],
  providers: [AtmModuleService],
  imports:[XstateModule]
})
export class AtmModuleModule {}
