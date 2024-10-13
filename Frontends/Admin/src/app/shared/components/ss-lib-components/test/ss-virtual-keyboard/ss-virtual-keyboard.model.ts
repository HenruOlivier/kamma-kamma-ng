import { SSVirtualKey } from "./ss-virtual-key.model";

export interface SSKeyboardLayout {
    name: string
    states: {
        name: string,
        keys: SSVirtualKey[][]
    }[]
}