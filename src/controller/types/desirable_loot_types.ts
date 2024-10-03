import { DesirableLoot } from "../../models/desirable_loot.model";

export interface createDesirableLootPayload {
    static_mate_id: number;
    loot_table_id: number;
    date_obtained: Date;
}

export interface DesirableLootServiceReturn {
  status: string;
  data: string | DesirableLoot | DesirableLoot[] | number;
}

export interface findDesirableLootPayload {
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

export interface findDesirableLootPayload {
    static_mate_id: number;
    loot_table_id: number;
    date_obtained: Date;
}
