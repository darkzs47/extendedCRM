import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({ tableName: 'categories', timestamps: false, underscored: true })
export class CategoryModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    name!: string;

    @Column
    markup?: number;
}
