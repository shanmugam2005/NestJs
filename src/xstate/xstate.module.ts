import { Module } from '@nestjs/common';
import { XstateService } from './xstate.service';

@Module({
  providers: [XstateService],
  exports:[XstateService]
})
export class XstateModule {}
