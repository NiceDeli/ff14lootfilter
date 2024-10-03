import pkg, { create } from "lodash";
const { difference } = pkg;
import { KillHistory } from "../models/kill_history.model.js";
import { UpdatedAt } from "sequelize-typescript";
import {
  createKillHistoryPayload,
  KillHistoryServiceReturn,
  updateKillHistoryPayload,
  findKillHistoryPayload,
  deleteKillHistoryPayload,
} from "./types/kill_history_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express
import { errorMonitor } from "stream";

///////Read or Pull all
export const getAllKillHistory = async (
  req: Request,
  res: Response
): Promise<KillHistoryServiceReturn> => {
  try {
    const getAllKillHistory = req.query;
    console.log("Calling find all for Loot on the Table");
    const allKillHistory: KillHistory[] = await KillHistory.findAll({
      where: getAllKillHistory,
      order: [["id", "asc"]],
    });
    res.status(200).json({
      status: "Sucesss",
      data: allKillHistory,
    });

    return {
      status: "Sucesss",
      data: allKillHistory,
    };
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: error.message,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

// Pull a SINGLE PERSON NEEDS TO BE FIXED
export const getSingleKillHistory = async (
  req: Request<{ id: number }, {}, {}, createKillHistoryPayload>,
  res: Response
): Promise<KillHistoryServiceReturn> => {
  try {
    console.log("Calling find a single KillHistory from KillHistory");
    const getSingleRaidKillHistory = req.query;
    const { id }: { id: number } = req.params;
    const getSingleKillHistory: KillHistory = await KillHistory.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: getSingleKillHistory,
    });

    return {
      status: "Success",
      data: getSingleKillHistory,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      data: error,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

export const createSingleKillHistory = async (
  req: Request<{}, createKillHistoryPayload>,
  res: Response
): Promise<KillHistoryServiceReturn> => {
  try {
    const createSingleKillHistory: createKillHistoryPayload = req.body;
    console.log("calling createSingleKillHistory");
    const default_fields: string[] = Object.keys(createSingleKillHistory);
    const REQUIRED_KILL_HISTORY_FIELDS: string[] = [
      "floor_id",
      "date_killed",
    ];
    const missingFields: string[] = difference(
      REQUIRED_KILL_HISTORY_FIELDS,
      default_fields
    );
    if (missingFields.length !== 0) {
      res.status(400).json({
        message: {
          status: "Error",
          data: "Error Missing Required Fields",
        },
      });

      return {
        status: "Error",
        data: "Missing required fields:",
      };
    }

    if (default_fields.length !== REQUIRED_KILL_HISTORY_FIELDS.length) {
      res.status(400).json({
        message: {
          status: "Error",
          data: "Extra Fields added to Post Body",
        },
      });

      return {
        status: "Error",
        data: "Extra Fields added to Post Body",
      };
    }
    //properties on the query object and the query object is property on the request object

    console.log("req.body", req.body);
    //find a single pesron

    //this is the set up of paramaters for postman
    const single_kll_history: KillHistory = await KillHistory.create({
      floor_id: createSingleKillHistory.floor_id,
      date_killed: createSingleKillHistory.date_killed,
    });
    //this is confirming that things worked
    res.status(200).json({
      status: "Success",
      data: single_kll_history,
    });

    return {
      status: "Sucess",
      data: single_kll_history,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      data: "KillHistory was unable to be made:" + error,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

/////Update
export const updateKillHistory = async (
  req: Request<{ id: number }, updateKillHistoryPayload>,
  res: Response
): Promise<KillHistoryServiceReturn> => {
  try {
    const updateKillHistoryInfo: updateKillHistoryPayload = req.body;
    const Kill_History_Keys: string[] = Object.keys(KillHistory.getAttributes());
    const getAllRaidKillHistorys = req.body;
    for (const key in getAllRaidKillHistorys) {
      if (!Kill_History_Keys.includes(key)) {
        res.status(400).json({
          status: "Error",
          data: "Invalid Field: " + key,
        });
        return {
          status: "Error",
          data: "Invalid Field",
        };
      }
    }

    const { id }: { id: number } = req.body;
    console.log("req.body is reading", updateKillHistoryInfo);

    const [affectedCount, affectedRows]: [number, KillHistory[]] = await KillHistory.update(
      updateKillHistoryInfo,
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    //POSTMAN GETS THIS
    res.status(200).json({
      status: "Success",
      data: affectedRows,
    });

    //THIS IS FOR WHEN YOU RETURN BACK THE FUNCTION
    return {
      status: "Sucess",
      data: affectedRows,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      data: error,
    });

    return {
      status: "Error",
      data: error,
    };
  }
};

///////Delete
export const deleteKillHistory = async (
  req: Request<{ id: number }, {}, {}, deleteKillHistoryPayload>,
  res: Response
): Promise<KillHistoryServiceReturn> => {
  try {
    const { id }: { id: number } = req.params;
    const delete_single_kill_history: number = await KillHistory.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "Sucess",
      data: delete_single_kill_history,
    });

    return {
      status: "Sucess",
      data: delete_single_kill_history,
    };
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: "KillHistory was unable to be deleted:" + error,
    });
    return {
      status: "Error",
      data: error,
    };
  }
};
