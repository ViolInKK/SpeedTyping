import { Model, Table, Column, DataType} from "sequelize-typescript";

interface wordCreationAttrs{
    word: string 
}

@Table({tableName: 'words'})
export class Words extends Model<Words, wordCreationAttrs>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    word:string;
}

