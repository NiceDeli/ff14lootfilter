export interface createFloorPayload {
    floor_abbreviation: string;
    floor_name: string;
}

export interface FloorServiceReturn {
    status: string;
    data: string;
}

export interface updateFloorPayload {
    floor_abbreviation?: string;
    floor_name?: string;
}