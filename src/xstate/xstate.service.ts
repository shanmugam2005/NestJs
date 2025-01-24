import { Injectable } from '@nestjs/common';
import { setup } from 'xstate';

@Injectable()
export class XstateService {
    async getMachine(config){

        const {actions,guard,actors,delays,context,states,initialState,id}=config

        const Machine=await setup({
            actions:actions,
            guards:guard,
            actors:actors,
            delays:delays
        }).createMachine({
            id:id,
            context:context,
            initial:initialState,
            states:states


    })

        return Machine;

    }
}
