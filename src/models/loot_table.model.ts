import "../config/db.js";
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
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from "sequelize-typescript";

import { Floor } from "../models/floor.model.js";
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
  @Column(DataType.NUMBER)
  @ForeignKey(() => Floor)
  floor_id: number;

  @AllowNull(false)
  @Column(DataType.ENUM("Raid", "Crafted", "Tome", "Other"))
  gear_source: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  iLvl: number;

  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @AllowNull(false)
  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @BelongsTo(() => Floor)// Define that LootTable belongs to Floor
  floor:Floor //Possibility for lootTable to be part of the Floor Object if we add include in the query
}
