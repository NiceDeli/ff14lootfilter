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
  HasMany,
  ForeignKey,
  BelongsTo,
  NotNull,
} from "sequelize-typescript";

import { LootTable } from "../models/loot_table.model.js";
@Table({
  freezeTableName: true,
  tableName: "floor",
})
export class Floor extends Model<Floor> {
  @AutoIncrement
  @AllowNull(false)
  @PrimaryKey
  @Column(DataType.INTEGER)
  //@HasMany(() => LootTable, 'floor_id')
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

// LootTable.hasMany(Floor, { foreignKey: 'id', as: 'floor_id' });
// Floor.belongsTo(LootTable, { foreignKey: 'id', as: 'raid_floor_id' });
