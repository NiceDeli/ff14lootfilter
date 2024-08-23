import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    PrimaryKey,
    Table,
    Model,
    UpdatedAt
} from 'sequelize-typescript';

@Table({
    freezeTableName: true,
    tableName: 'static_mates'
})
export class StaticMate extends Model<StaticMate> {
    @AutoIncrement
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    role: string;

    @AllowNull(false)
    @CreatedAt
    @Column(DataType.DATE)
    createdAt: Date;

    @AllowNull(false)
    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt: Date;
}
