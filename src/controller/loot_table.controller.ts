import pkg from "lodash";
const { difference } = pkg;
import { LootTable } from "../models/loot_table.model.js";
import {
  createPayload,
  updateLootTablePayload,
  LootTableServiceReturn,
  findLootTablePayload,
  deleteLootTablePayload,
} from "./types/loot_table_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express

///////Read or Pull all
//need to add promises
export const findAllLootTable = async (
  req: Request<{ id: number }, {}, {}, findLootTablePayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    const getAllLoot: findLootTablePayload = req.query;
    console.log("Calling find all for Loot on the Table");
    const allLootTables: LootTable[] = await LootTable.findAll({
      where: getAllLoot,
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
  req: Request<{ id: number }, {}, {}, findLootTablePayload>, //You should build scalability with queries in the future, this is good for now though
  res: Response
): Promise<LootTableServiceReturn> => {
  const findSingleLoot: findLootTablePayload = req.query;
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
  req: Request<{}, createPayload>,
  res: Response
): Promise<LootTableServiceReturn> => {
  try {
    const createSingleLootTable: createPayload = req.body;
    const default_fields: string[] = Object.keys(createSingleLootTable);
    const REQUIRED_LOOT_TABLE_FIELDS: string[] = [
      "piece_type",
      "gear_source",
      "name_of_gear",
      "floor_id",
      "iLvl",
    ];
    const missingFields: string[] = difference(
      REQUIRED_LOOT_TABLE_FIELDS,
      default_fields
    );
    console.log(default_fields),
      console.log(REQUIRED_LOOT_TABLE_FIELDS),
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

    if (default_fields.length !== REQUIRED_LOOT_TABLE_FIELDS.length) {
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
    const single_loot_piece: LootTable = await LootTable.create({
      piece_type: createSingleLootTable.piece_type,
      name_of_gear: createSingleLootTable.name_of_gear,
      floor_id: createSingleLootTable.floor_id,
      gear_source: createSingleLootTable.gear_source,
      iLvl: createSingleLootTable.iLvl,
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
    const updateLootTableInfo: updateLootTablePayload = req.body;
    const Loot_Table_Keys: string[] = Object.keys(LootTable.getAttributes());
    const getAllLootTable:findLootTablePayload = req.body; //json object
    for (const key in getAllLootTable) {
      if (!Loot_Table_Keys.includes(key)) {
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
