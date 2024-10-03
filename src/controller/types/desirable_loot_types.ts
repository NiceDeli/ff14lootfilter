import { DesirableLoot } from "../../models/desirable_loot.model";
import { WhereOptions } from "sequelize";

export interface createDesirableLootPayload {
    static_mate_id: number;
    loot_table_id: number;
    date_obtained: Date;
}

export interface DesirableLootServiceReturn {
  status: string;
  data: string | DesirableLoot | DesirableLoot[] | number;
}

export type findDesirableLootPayload = WhereOptions<DesirableLoot> &{
    static_mate_id: number;
    loot_table_id: number;
    date_obtained: Date;
}

export interface updateDesirableLootPayload {
    static_mate_id: number;
    loot_table_id: number;
    date_obtained: Date;
    id?: number;
}

export interface deleteDesirableLootPayload {
    static_mate_id: number;
    loot_table_id: number;
    date_obtained: Date;
    id?: number;
}

