import { CurrentLoot } from "../../models/current_loot.model";

export interface createCurrentLootPayload {
    static_mate_id: number;
    loot_table_id: number;
}

export interface CurrentLootServiceReturn {
  status: string;
  data: string | CurrentLoot | CurrentLoot[] | number;
}

export interface findCurrentLootPayload {
    static_mate_id?: number;
    loot_table_id?: number;
    id?: number;
}

export interface updateCurrentLootPayload {
    static_mate_id: number;
    loot_table_id: number;
    id?: number;
}

export interface deleteCurrentLootPayload {
    static_mate_id?: number;
    loot_table_id?: number;
    id?: number;
}
