import {Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript';
import {UserModel} from "../UserModel/UserModel";


@Table({ tableName: 'tokens', timestamps: false, underscored: true })
export class TokenModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @ForeignKey(() => UserModel)
    @Column
    userId!: number;

    @BelongsTo(() => UserModel)
    userModel!: UserModel;

    @Column
    refreshToken!: string;
}
