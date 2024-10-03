import { AllowNull, AutoIncrement, Column, DataType, PrimaryKey, Table, Model, HasMany, BelongsTo} from "sequelize-typescript";
import { LootTable } from "./loot_table.model.js"; // Ensure this import exists
import { StaticMate } from "./static_mates.model.js"; // Ensure this import exists

@Table({
  freezeTableName: true,
  tableName: "current_loot",
})
export class CurrentLoot extends Model<CurrentLoot> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  static_mate_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  loot_table_id: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt: Date;

  // @HasMany(() => LootTable) // Define that Floor has many LootTable entries
  lootTables: LootTable[];
  staticMates: StaticMate[];
}
