import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model, HasMany } from "sequelize-typescript";
import { LootTable } from "./loot_table.model.js"; // Ensure this import exists

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
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt: Date;

  // @HasMany(() => LootTable) // Define that Floor has many LootTable entries
  lootTables: LootTable[];
}
