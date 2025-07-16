import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({ tableName: 'distanceCoefficients', timestamps: false, underscored: true })
export class DistanceCoefficientsModel extends Model {
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
