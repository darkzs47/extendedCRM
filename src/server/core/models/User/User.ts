export type UserProps = {
    id?: number;
    secondName: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    supplierID?: number;
};

export class User {
    constructor(
        readonly props: UserProps
    ) { }
}