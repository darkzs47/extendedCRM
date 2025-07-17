import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Seasons} from "../../../../core/models/Coefficients/Season";

@Table({ tableName: 'seasonal_coefficients', timestamps: false, underscored: true })
export class SeasonCoefficientModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column
    season!: Seasons;

    @Column
    coefficient!: number;
}
