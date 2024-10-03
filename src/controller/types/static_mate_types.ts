import { StaticMate } from "../../models/static_mates.model";

export interface createStaticMatePayload {
  name: string;
  role: string;
}

export interface StaticMateServiceReturn {
  status: string;
  data: string | StaticMate | StaticMate[] | number;
}

export interface findStaticMatePayload {
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
