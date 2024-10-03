import { Floor } from "../../models/floor.model";
import { WhereOptions } from "sequelize";

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

export type findFloorPayload = WhereOptions<Floor> &  {
  floor_abbreviation?: string;
  floor_name?: string;
}

export interface deleteFloorPayload {
  floor_abbreviation: string;
  floor_name: string;
}
