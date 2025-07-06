export interface IAddress {
    id: number;
    region: string;
    city: string;
    street: string;
    house: string;
    building?: string;
    postCode: string;
}