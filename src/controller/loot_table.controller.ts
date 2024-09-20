import { UpdatedAt } from "sequelize-typescript";
import { LootTable } from "../models/loot_table.model.js";
import {
  createPayload,
  updateLootTablePayload,
  LootTableServiceReturn,
  findLootTablePayload,
  deleteLootTablePayload,
} from "./types/loot_table_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express
import { StaticMateServiceReturn } from "./types/static_mate_types.js";
import { Floor } from "../models/floor.model.js";

///////Read or Pull all
//need to add promises
export const findAllLootTable = async (
  req: Request<{ id: string }, any, findLootTablePayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    console.log("Calling find all for Loot on the Table");
    const allLootTables: LootTable[] = await LootTable.findAll({
      order: [["id", "asc"]],
    });
    res.status(200).json({
        status: "Sucesss",
        data: allLootTables,
    });
    return {
      status: "Sucess",
      data: allLootTables
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: error.message,
      },
    });
    return {
      status: "Error",
      data: error.message,
    };
  }
};
///create

export const createSingleLootTable = async (
  req: Request<
    {
      piece_type: string;
      name_of_gear: string;
      floor_id: number;
      gear_source: string;
      iLvl: number;
    },
    any,
    createPayload
  >,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    //properties on the query object and the query object is property on the request object
    const createPayload: createPayload = req.body;
    console.log("req.body", req.body);

    //this is the set up of paramaters for postman
    const single_loot_piece: object = await LootTable.create({
      piece_type: createPayload.piece_type,
      name_of_gear: createPayload.name_of_gear,
      floor_id: createPayload.floor_id,
      gear_source: createPayload.gear_source,
      iLvl: createPayload.iLvl,
    });
    //this is confirming that things worked
    res.status(200).json({
      message: {
        status: "Sucesss",
        data: single_loot_piece,
      },
    });

    return {
      status: "Sucess",
      data: "Item was made!",
    };
  } catch (error) {
    console.log("we had an error: ", error);
    res.status(500).json({
      message: {
        status: "Error",
        data: "Item was unable to be made" + error,
      },
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

/////Update
export const updateLootTable = async (
  req: Request<{ id: string }, any, updateLootTablePayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const { id }: { id: string } = req.params;
    const updateLootTableInfo: updateLootTablePayload = req.body;
    console.log("req.body is reading:", updateLootTableInfo);
    await LootTable.update(updateLootTableInfo, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: {
        status: "Sucess",
        data: "The item was updated!",
      },
    });

    return {
      status: "Sucess",
      data: "Item was updated!",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Failure",
        data: "The item was not updated because: " + error,
      },
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

// Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleLootTable = async (
  req: Request<{ id: string }, any, findLootTablePayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    console.log("Calling find a single loot from loot_table");
    const findSingleLootTable: object = await LootTable.findOne();
    res.status(200).json({
      message: {
        status: "Sucess",
        data: "Loot has been found",
      },
    });

    return {
      status: "Sucess",
      data: "Loot was found!",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Faliure",
        data: "Error trying to find Loot" + error,
      },
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

///////Delete
export const deleteLootTable = async (
  req: Request<{ id: string }, any, deleteLootTablePayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    const { id } = req.params;
    const single_loot_piece = await LootTable.destroy({
      where: {
        id: id,
      },
    });

    return {
      status: "Sucess",
      data: "Delete was sucessful!",
    };

    res.status(200).json({
      message: {
        status: "Sucess",
        data: "Item is ded. No big surprise",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Unable to delete the item?",
      },
    });
    return {
      status: "Error",
      data: error.message,
    };
  }
};

// return res.status(200).json({ message:
//   {
//       status: 'Sucesss',
//       data: 'The following was created:' + single_loot_piece
//   }

//createSingleLootTable({params: {gear_piece: "bracelet", gear_name:"Light-heavyweight raid ", floor_level: "m1s", source_of_gear: "Raid", itemLvl:730}}, {});
//updateLootTable({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res
