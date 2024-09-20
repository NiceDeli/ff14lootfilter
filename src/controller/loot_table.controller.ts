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
  req: Request,
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
      data: allLootTables,
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

// Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleLootTable = async (
  req: Request<{ id: number }>, //You should build scalability with queries in the future, this is good for now though
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    console.log("Calling find a single loot from loot_table");
    const { id }: { id: number } = req.params;

    const findSingleLootTable: LootTable = await LootTable.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: findSingleLootTable,
    });

    return {
      status: "Success",
      data: findSingleLootTable,
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

export const createSingleLootTable = async (
  req: Request<createPayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    //properties on the query object and the query object is property on the request object
    const createPayload: createPayload = req.body;
    console.log("req.body", req.body);

    //this is the set up of paramaters for postman
    const single_loot_piece: LootTable = await LootTable.create({
      piece_type: createPayload.piece_type,
      name_of_gear: createPayload.name_of_gear,
      floor_id: createPayload.floor_id,
      gear_source: createPayload.gear_source,
      iLvl: createPayload.iLvl,
    });
    //this is confirming that things worked
    res.status(200).json({
      status: "Sucesss",
      data: single_loot_piece,
    });

    return {
      status: "Sucess",
      data: single_loot_piece,
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
export const updateLootTable = async (
  req: Request<{ id: number }, updateLootTablePayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const { id }: { id: number } = req.params;
    const updateLootTableInfo: updateLootTablePayload = req.body;
    console.log("req.body is reading:", updateLootTableInfo);

    const [affectedCount, affectedRows]: [number, LootTable[]] =
      await LootTable.update(updateLootTableInfo, {
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
export const deleteLootTable = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    const { id }: { id: number } = req.params;
    const delete_single_loot_piece: number = await LootTable.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: delete_single_loot_piece,
    });

    return {
      status: "Success",
      data: delete_single_loot_piece,
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

// return res.status(200).json({ message:
//   {
//       status: 'Sucesss',
//       data: 'The following was created:' + single_loot_piece
//   }

//createSingleLootTable({params: {gear_piece: "bracelet", gear_name:"Light-heavyweight raid ", floor_level: "m1s", source_of_gear: "Raid", itemLvl:730}}, {});
//updateLootTable({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res
