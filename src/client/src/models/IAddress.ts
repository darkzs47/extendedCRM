export interface IAddress {
    id: number;
    country: string;
    region: string;
    city: string;
    street: string;
    house: string;
    building?: string;
    postCode: string;
}