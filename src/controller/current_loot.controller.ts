import pkg, { create } from "lodash";
const { difference } = pkg;
import { CurrentLoot } from "../models/current_loot.model.js";
import {
  createCurrentLootPayload,
  updateCurrentLootPayload,
  CurrentLootServiceReturn,
  findCurrentLootPayload,
  deleteCurrentLootPayload,
} from "./types/current_loot_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express
import { WhereOptions } from "sequelize";

///////Read or Pull all
//need to add promises
export const getAllCurrentLoot = async (
  req: Request<{ id: number }, {}, {}, findCurrentLootPayload>,
  res: Response
): Promise<CurrentLootServiceReturn> => {
  try {
    const getAllCurrentLoot: findCurrentLootPayload = req.query;
    console.log("Calling find all desirable loot");
    const allCurrentLoot: CurrentLoot[] = await CurrentLoot.findAll({
      where: getAllCurrentLoot as WhereOptions<CurrentLoot>,
      order: [["id", "asc"]],
    });
    res.status(200).json({
      status: "Sucesss",
      data: allCurrentLoot,
    });
    return {
      status: "Sucess",
      data: allCurrentLoot,
    };
  } catch (error) {
    console.error(error);
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

export const getSingleCurrentLoot = async (
  req: Request<{ id: number }, {}, {}, createCurrentLootPayload>, //You should build scalability with queries in the future, this is good for now though
  res: Response
): Promise<CurrentLootServiceReturn> => {
  const findSingleLoot = req.query;
  try {
    console.log("Calling find a single loot from loot_table");
    const { id }: { id: number } = req.params;

    const findSingleCurrentLoot: CurrentLoot = await CurrentLoot.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: findSingleCurrentLoot,
    });

    return {
      status: "Success",
      data: findSingleCurrentLoot,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Faliure",
      data: "Error trying to find Loot" + error,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

///create
export const createSingleCurrentLoot = async (
  req: Request<{}, createCurrentLootPayload>,
  res: Response
): Promise<CurrentLootServiceReturn> => {
  try {
    const createSingleCurrentLoot: createCurrentLootPayload = req.body;
    const default_fields: string[] = Object.keys(createSingleCurrentLoot);
    const REQUIRED_current_loot_FIELDS: string[] = [
      "static_mate_id",
      "loot_table_id",
    ];
    const missingFields: string[] = difference(
      REQUIRED_current_loot_FIELDS,
      default_fields
    );
    console.log(default_fields),
      console.log(REQUIRED_current_loot_FIELDS),
      console.log(missingFields);
    if (missingFields.length !== 0) {
      res.status(400).json({
        message: {
          status: "Error",
          data: "Missing required fields",
        },
      });
      return {
        status: "Error",
        data: "Missing required fields:",
      };
    }

    if (default_fields.length !== REQUIRED_current_loot_FIELDS.length) {
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
    //const getAllStaticMates = req.query;
    console.log("req.body", req.body);

    //this is the set up of paramaters for postman
    const single_current_loot: CurrentLoot = await CurrentLoot.create({
      static_mate_id: createSingleCurrentLoot.static_mate_id,
      loot_table_id: createSingleCurrentLoot.loot_table_id,
    });
    //this is confirming that things worked
    res.status(200).json({
      status: "Sucesss",
      data: single_current_loot,
    });

    return {
      status: "Sucess",
      data: single_current_loot,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      data: "Item was unable to be made" + error,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

/////Update
export const updateCurrentLoot = async (
  req: Request<{ id: number }, updateCurrentLootPayload>,
  res: Response
): Promise<CurrentLootServiceReturn> => {
  try {
    const updateCurrentLootInfo: updateCurrentLootPayload = req.body;
    const current_loot_Keys: string[] = Object.keys(CurrentLoot.getAttributes());
    const getAllCurrentLoot = req.body; //json object
    for (const key in getAllCurrentLoot) {
      if (!current_loot_Keys.includes(key)) {
        res.status(400).json({
          status: "Error",
          data: "Invalid Field: " + key,
        });
        return {
          status: "Error",
          data: "Invalid Field: " + key,
        };
      }
    }
    console.log("Outside the floor loop");
    //do a find first to see if that thing exist
    //also ends things early
    const { id }: { id: number } = req.body;
    console.log("req.body is reading:", updateCurrentLootInfo);

    const [affectedCount, affectedRows]: [number, CurrentLoot[]] =
      await CurrentLoot.update(updateCurrentLootInfo, {
        where: {
          id: id,
        },
        returning: true,
      });

    res.status(200).json({
      status: "Sucess",
      data: affectedRows,
    });

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
      data: error.message,
    };
  }
};

///////Delete
export const deleteCurrentLoot = async (
  req: Request<{ id: number }, {}, {}, deleteCurrentLootPayload>,
  res: Response
): Promise<CurrentLootServiceReturn> => {
  try {
    const { id }: { id: number } = req.params;
    const delete_single_current_loot: number = await CurrentLoot.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: delete_single_current_loot,
    });

    return {
      status: "Success",
      data: delete_single_current_loot,
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
