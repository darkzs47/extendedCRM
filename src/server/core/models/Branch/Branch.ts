import {Address} from "../Address/Address";

export class Branch {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly phone: string,
        readonly addressActual: Address,
        readonly addressLegal: Address,
        readonly isMain: boolean,
    ) { }
}