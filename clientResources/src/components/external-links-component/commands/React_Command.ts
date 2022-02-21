import { ReactStateful } from "./React_Stateful";

export class ReactCommand extends ReactStateful{
    canExecute: boolean = true;
    isActive: boolean = true;
    isAvailable: boolean = true;
}
