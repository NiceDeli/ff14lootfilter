import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  PrimaryKey,
  Table,
  Model,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  freezeTableName: true,
  tableName: "floor",
})
export class Floor extends Model<Floor> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  floor_abbreviation: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  floor_name: string;

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;
}
