import { DialogExitType } from "./dialogExitTypes.model";

export class DialogExitValues {
    constructor(
        public type: DialogExitType,
        public text: string,
        public classList?: string,
    ) { }
}