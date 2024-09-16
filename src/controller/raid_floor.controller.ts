import { UpdatedAt } from "sequelize-typescript";
import { Floor } from "../models/floor.model.js";
import { createFloorPayload } from "./types/raid_floor_types.js";

///////Read or Pull all
export const findAllFloor: object = async (req, res) => {
  try {
    console.log("Calling find all for Loot on the Table");
    const allFloor: Floor[] = await Floor.findAll();
    res.status(200).json({
      message: {
        status: "Sucesss",
        data: "The following was pulled:" + allFloor,
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

// Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleLootTable: object = async (req, res) => {
  try {
    console.log("Calling find a single floor from raid_floor");
    const findSingleFloor: object = await Floor.findOne();
    res.status(200).json({
      message: {
        status: "Sucess",
        data: "Raid floor has been updated",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Faliure",
        data: "Error trying to update raid floor: " + error,
      },
    });
  }
};

export const createSingleFloor: object = async (req, res) => {
  try {
    //properties on the query object and the query object is property on the request object
    const createFloorPayload: createFloorPayload = req.body;
    console.log("req.body", req.body);
    //find a single pesron
    const findSingleFloor = await Floor.findOne({
      where: { floor_abbreviation: createFloorPayload.floor_abbreviation },
    });
    //this is the set up of paramaters for postman
    const single_floor = await Floor.create({
      floor_abbreviation: createFloorPayload.floor_abbreviation,
      floor_name: createFloorPayload.floor_name,
    });
    //this is confirming that things worked
    return res.status(200).json({
      message: {
        status: "Sucess",
        data: "Floor was made!",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Floor was unable to be made:" + error,
      },
    });
  }
};

/////Update
export const updateFloor: object = async (req, res) => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const { id } = req.params;
    const { floor_acronym: string, floor_full_name: sting } = req.body;
    console.log("req.body is reading", req.body);
    await Floor.update(req.body, {
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: {
        status: "Sucess",
        data: "Floor was updated!",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Floor was unable to be updated:" + error,
      },
    });
  }
};

///////Delete
export const deleteRaidFloor: object = async (req, res) => {
  try {
    const { id } = req.params;
    const single_Raid_Floor = await Floor.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: {
        status: "Sucess",
        data: "Floor was deleted!",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Floor was unable to be deleted:" + error,
      },
    });
  }
};

//createSingleLootTable({params: {gear_piece: "bracelet", gear_name:"Light-heavyweight raid ", floor_level: "m1s", source_of_gear: "Raid", itemLvl:730}}, {});
//updateLootTable({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res
