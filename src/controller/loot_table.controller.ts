import { UpdatedAt } from "sequelize-typescript";
import { LootTable } from "../models/loot_table.model.js";
import { createPayload } from "./types/loot_table_types.js";

///////Read or Pull all
//need to add promises
export const findAllLootTable = async (req, res) => {
  try {
    console.log("Calling find all for Loot on the Table");
    const allLootTables: LootTable[] = await LootTable.findAll();
    res.status(200).json({
      message: {
        status: "Sucesss",
        data: "The following was pulled:" + allLootTables,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Faliure",
        data: error.message,
      },
    });
  }
};

// // Pull a SINGLE PERSON NEEDS TO BE FIXED
// export const findSingleLootTable = async (req, res) => {
//     try {
//         console.log("Calling find all for Static Mates")
//         const allLootTables:LootTable[] = await LootTable.findAll();
//         res.status(200).json({message: allLootTables})
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

///create

export const createSingleLootTable: object = async (req, res) => {
  try {
    //properties on the query object and the query object is property on the request object
    const createPayload: createPayload = req.body;
    console.log("req.body", req.body);
    //find a single pesron
    const findSingleLootTable: object = await LootTable.findOne({
      where: { name_of_gear: createPayload.name_of_gear },
    });
    if (findSingleLootTable) {
      throw Error("There was already loot piece with that name");
      return;
    }
    //this is the set up of paramaters for postman
    const single_loot_piece: object = await LootTable.create({
      piece_type: createPayload.piece_type,
      name_of_gear: createPayload.name_of_gear,
      floor_id: createPayload.floor_id,
      gear_source: createPayload.gear_source,
      iLvl: createPayload.iLvl,
    });
    //this is confirming that things worked
    return res.status(200).json({
      message: {
        status: "Sucesss",
        data: "The following was created:" + single_loot_piece,
      },
    });
  } catch (error) {
    console.log("we had an error: ", error);
    res.status(500).json({
      message: {
        status: "Error",
        data: "Item was unable to be made" + error,
      },
    });
  }
};

/////Update
export const updateLootTable: object = async (req, res) => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const { id } = req.params;
    const { gear_piece, gear_name, floor_level, source_of_gear, itemLvl } =
      req.body;
    console.log("req.body is reading:" + req.body);
    await LootTable.update(req.body, {
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
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Failure",
        data: "The item was not updated because: " + error,
      },
    });
  }
};

///////Delete
export const deleteLootTable: object = async (req, res) => {
  try {
    const { id } = req.params;
    const single_loot_piece = await LootTable.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
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
