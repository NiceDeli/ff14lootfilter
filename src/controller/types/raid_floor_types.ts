import { Floor } from "../../models/floor.model";

export interface createFloorPayload {
  floor_abbreviation: string;
  floor_name: string;
}

export interface FloorServiceReturn {
  status: string;
  data: string | Floor | Floor[] | number;
}

export interface updateFloorPayload {
  floor_abbreviation?: string;
  floor_name?: string;
}

export interface findFloorPayload {
  floor_abbreviation?: string;
  floor_name?: string;
}

export interface deleteFloorPayload {
  floor_abbreviation: string;
  floor_name: string;
}
