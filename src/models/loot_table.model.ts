import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Floor } from "./floor.model.js"; // Ensure this import exists

@Table({
  freezeTableName: true,
  tableName: "loot_table",
})
export class LootTable extends Model<LootTable> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(
    DataType.ENUM(
      "accessory_upgrade",
      "armor_upgrade",
      "bracelet",
      "chest",
      "earrings",
      "feet",
      "gloves",
      "head",
      "legs",
      "necklace",
      "ring",
      "offhand"
    )
  )
  piece_type: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name_of_gear: string;

  @AllowNull(false)
  @ForeignKey(() => Floor) // Foreign key references Floor
  @Column(DataType.INTEGER)
  floor_id: number;

  @AllowNull(false)
  @Column(DataType.ENUM("Raid", "Crafted", "Tome", "Other"))
  gear_source: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  iLvl: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  updatedAt: Date;

  // @BelongsTo(() => import('./floor.model.js').then(m => m.Floor))  // Lazy loading the Floor model using import()
  floor: Floor; // Adjusted TypeScript type
}
