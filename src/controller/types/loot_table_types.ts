export interface createPayload {
    piece_type: string;
    name_of_gear: string;
    floor_id: number;
    gear_source: string;
    iLvl: number;
}

export interface LootTableServiceReturn {
    status: string;
    data: string;
}

export interface updateLootTablePayload {
    piece_type?: string;
    name_of_gear?: string;
    floor_id?: number;
    gear_source?: string;
    iLvl?: number;
}

export interface findLootTablePayload {
    piece_type?: string;
    name_of_gear?: string;
    floor_id?: number;
    gear_source?: string;
    iLvl?: number;
}

export interface deleteLootTablePayload {
    piece_type: string;
    name_of_gear: string;
    floor_id: number;
    gear_source: string;
    iLvl: number;
}