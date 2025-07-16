import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({ tableName: 'distance_coefficients', timestamps: false, underscored: true })
export class DistanceCoefficientModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    minKm!: number;

    @Column
    maxKm!: number;

    @Column
    coefficient!: number;
}
