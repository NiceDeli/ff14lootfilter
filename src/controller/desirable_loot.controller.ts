import pkg, { create } from "lodash";
const { difference } = pkg;
import { DesirableLoot } from "../models/desirable_loot.model.js";
import {
  createDesirableLootPayload,
  updateDesirableLootPayload,
  DesirableLootServiceReturn,
  findDesirableLootPayload,
  deleteDesirableLootPayload,
} from "./types/desirable_loot_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express
import { WhereOptions } from "sequelize";

///////Read or Pull all
export const findAllDesirableLoot = async (
  req: Request<{ id: number }, {}, {}, findDesirableLootPayload>,
  res: Response
): Promise<DesirableLootServiceReturn> => {
  try {
    const getAllDesirableLoot: findDesirableLootPayload = req.query;
    console.log("Calling find all desirable loot");
    const allDesirableLoot: DesirableLoot[] = await DesirableLoot.findAll({
      where: getAllDesirableLoot,
      order: [["id", "asc"]],
    });
    res.status(200).json({
      status: "Sucesss",
      data: allDesirableLoot,
    });
    return {
      status: "Sucess",
      data: allDesirableLoot,
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

export const findSingleDesirableLoot = async (
  req: Request<{ id: number }, {}, {}, findDesirableLootPayload>, //You should build scalability with queries in the future, this is good for now though
  res: Response
): Promise<DesirableLootServiceReturn> => {
  const findSingleDesirableLoot: findDesirableLootPayload = req.query;
  try {
    console.log("Calling find a single loot from loot_table");
    const { id }: { id: number } = req.params;
    const findSingleDesirableLoot: DesirableLoot = await DesirableLoot.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: findSingleDesirableLoot,
    });

    return {
      status: "Success",
      data: findSingleDesirableLoot,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failure",
      data: "Error trying to find Loot" + error,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

///create
export const createSingleDesirableLoot = async (
  req: Request<{}, createDesirableLootPayload>,
  res: Response
): Promise<DesirableLootServiceReturn> => {
  try {
    const createSingleDesirableLoot: createDesirableLootPayload = req.body;
    const default_fields: string[] = Object.keys(createSingleDesirableLoot);
    const REQUIRED_DESIRABLE_LOOT_FIELDS: string[] = [
      "static_mate_id",
      "loot_table_id",
      "date_obtained",
    ];
    const missingFields: string[] = difference(
      REQUIRED_DESIRABLE_LOOT_FIELDS,
      default_fields
    );
    console.log(default_fields),
      console.log(REQUIRED_DESIRABLE_LOOT_FIELDS),
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

    if (default_fields.length !== REQUIRED_DESIRABLE_LOOT_FIELDS.length) {
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
    const single_desirable_loot: DesirableLoot = await DesirableLoot.create({
      static_mate_id: createSingleDesirableLoot.static_mate_id,
      loot_table_id: createSingleDesirableLoot.loot_table_id,
      date_obtained: createSingleDesirableLoot.date_obtained,
    });
    //this is confirming that things worked
    res.status(200).json({
      status: "Sucesss",
      data: single_desirable_loot,
    });

    return {
      status: "Sucess",
      data: single_desirable_loot,
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
export const updateDesirableLoot = async (
  req: Request<{ id: number }, updateDesirableLootPayload>,
  res: Response
): Promise<DesirableLootServiceReturn> => {
  try {
    const updateDesirableLootInfo: updateDesirableLootPayload = req.body;
    const Desirable_Loot_Keys: string[] = Object.keys(
      DesirableLoot.getAttributes()
    );
    const getAllDesirableLoot:findDesirableLootPayload = req.body; //json object
    for (const key in getAllDesirableLoot) {
      if (!Desirable_Loot_Keys.includes(key)) {
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
    console.log("req.body is reading:", updateDesirableLootInfo);

    const [affectedCount, affectedRows]: [number, DesirableLoot[]] =
      await DesirableLoot.update(updateDesirableLootInfo, {
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
export const deleteDesirableLoot = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<DesirableLootServiceReturn> => {
  try {
    const { id }: { id: number } = req.params;
    const delete_single_desirable_loot: number = await DesirableLoot.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: delete_single_desirable_loot,
    });

    return {
      status: "Success",
      data: delete_single_desirable_loot,
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
