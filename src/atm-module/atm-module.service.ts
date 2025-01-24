import { Injectable } from '@nestjs/common';
import { XstateService } from 'src/xstate/xstate.service';
import { assign, createActor } from 'xstate';

@Injectable()
export class AtmModuleService {
    constructor(private machineService:XstateService){}
    private atmActor:any;

    private getActions() {
        return {
            getPin: () => {
                console.log("Enter a PIN");
            },
            viewBalance: ({ context }) => {
                console.log(`Your balance is: $${context.balance}`);
            },
            performTransfer: ({ context, event }) => {
                console.log(`Transferring $${event.amount} to account number ${context.receiver}`);
            },
        };
    }
    private getGuards() {
        return {
            pinValidate: ({ context, event }) => {
                if (context.accountNumber === event.pins) {
                    console.log("PIN validated");
                    return true;
                } else {
                    console.log("Invalid PIN");
                    return false;
                }
            },
            transferCheck: ({ context, event }) => {
                if (event.amount > 0 && event.amount <= context.balance) {
                    console.log("Transfer amount is valid.");
                    return true;
                } else {
                    console.log("Insufficient funds or invalid amount.");
                    return false;
                }
            },
        };
    } private getStates() {
        return {
            Card: {
                on: {
                    pinEntered: {
                        target: "pinCheck",
                    },
                },
                entry: ["getPin"],
            },
            pinCheck: {
                on: {
                    balance: {
                        guard: "pinValidate",
                        target: "balance",
                    },
                    withdrawal: {
                        guard: "pinValidate",
                        target: "withdrawal",
                    },
                    transfer: {
                        guard: "pinValidate",
                        target: "transfer",
                    },
                },
            },
            balance: {
                entry: ["viewBalance"],
                type: 'final',
            },
            withdrawal: {
                on: {
                    Amount: {
                        target: "confirm",
                        actions: assign({
                            amount: ({ context, event }) => event.amount,
                        }),
                    },
                },
            },
            transfer: {
                on: {
                    receNumber: {
                        actions: assign({
                            receiver: ({ context, event }) => event.receiver,
                        }),
                        target: "receNumber",
                    },
                },
            },
            receNumber: {
                on: {
                    Amount: {
                        guard: "transferCheck",
                        target: "confirm",
                        actions: assign({
                            amount: ({ context, event }) => event.amount,
                        }),
                    },
                },
                exit: ["performTransfer"],
            },
            confirm: {
                type: "final",
                entry: ({ context }) => {
                    if (context.amount < context.balance) {
                        console.log(`Transaction confirmed. Amount: $${context.amount}.`);
                        console.log(`Remaining balance: $${context.balance - context.amount}`);
                    } else {
                        console.log("Invalid transaction: Insufficient funds.");
                    }
                },
            },
        };
    }

    async startMachine() {
        const actions = this.getActions();
        const guards = this.getGuards();
        const states = this.getStates();
        const atmConfig = {
            actions: {
                ...actions,
            },
            guard: {
                ...guards,
            },
            states: {
                ...states,
            },
            id: "atmMachine",
            initialState: "Card",
            context: {
                balance: 1000,
                amount: 0,
                receiver: "",
                accountNumber: "1234567",
            },
        };

        const atmMachine = await this.machineService.getMachine(atmConfig);
         this.atmActor = await createActor(atmMachine);
        await this.atmActor.subscribe((state) => {
            console.log("Current state:", state.value);
        });

        this.atmActor.start();
    }
    getPin(){
        this.atmActor.send({type:"pinEntered"})
    }
    pinCheck(pin:string,type:string){
        this.atmActor.send({type:type,pins:pin});
    }
}
