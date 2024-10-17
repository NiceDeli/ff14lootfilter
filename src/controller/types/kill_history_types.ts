import { WhereOptions } from "sequelize";
import { KillHistory } from "../../models/kill_history.model";


export interface createKillHistoryPayload {
    floor_id: number;
    date_killed: Date;
}

export interface KillHistoryServiceReturn {
  status: string;
  data: string | KillHistory | KillHistory[] | number;
}

export type findKillHistoryPayload = WhereOptions<KillHistory> & {
    floor_id: number;
    date_killed: Date;
}

export interface updateKillHistoryPayload {
    floor_id: number;
    date_killed: Date;
}

export interface deleteKillHistoryPayload {
    floor_id: number;
    date_killed: Date;
}

