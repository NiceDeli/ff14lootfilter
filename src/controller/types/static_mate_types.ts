import { StaticMate } from "../../models/static_mates.model";
import { WhereOptions } from "sequelize";

export interface createStaticMatePayload {
  name: string;
  role: string;
}

export interface StaticMateServiceReturn {
  status: string;
  data: string | StaticMate | StaticMate[] | number;
}

export type findStaticMatePayload = WhereOptions<StaticMate> & {
  name?: string;
  role?: string;
}

export interface updateStaticMatePayload {
  name?: string;
  role?: string;
  id?: number;
}

export interface deleteStaticMatePayload {
  name: string;
  role: string;
}
