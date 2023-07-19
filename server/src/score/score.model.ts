import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "../users/users.model";

interface ScoreCreationAttrs{
    user_id: number
    score: number;
}


@Table({tableName: 'score'})

export class Score extends Model<Score, ScoreCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    user_id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    score: number
}