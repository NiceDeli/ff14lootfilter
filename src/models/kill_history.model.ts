import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Floor } from "./floor.model.js"; // Ensure this import exists

@Table({
  freezeTableName: true,
  tableName: "kill_history",
})
export class KillHistory extends Model<KillHistory> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @ForeignKey(() => Floor) // Foreign key references Floor
  @Column(DataType.INTEGER)
  floor_id: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  date_killed: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt: Date;

  // @BelongsTo(() => import('./floor.model.js').then(m => m.Floor))  // Lazy loading the Floor model using import()
  floor: Floor;  // Adjusted TypeScript type
}