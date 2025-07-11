export class CreateCategoryDto {
    constructor(
        readonly name: string,
        readonly markup: number,
    ) {    }
}