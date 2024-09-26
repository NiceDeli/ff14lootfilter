import { UpdatedAt } from "sequelize-typescript";
import { Floor } from "../models/floor.model.js";
import {
  createFloorPayload,
  FloorServiceReturn,
  updateFloorPayload,
  findFloorPayload,
  deleteFloorPayload,
} from "./types/raid_floor_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express
import { errorMonitor } from "stream";
///////Read or Pull all
export const getAllFloor = async (
  req: Request,
  res: Response
): Promise<FloorServiceReturn> => {
  try {
    const getAllFloor = req.query;
    console.log("Calling find all for Loot on the Table");
    const allFloor: Floor[] = await Floor.findAll({
      where: getAllFloor,
      order: [["id", "asc"]],
    });
    res.status(200).json({
      status: "Sucesss",
      data: allFloor,
    });

    return {
      status: "Sucesss",
      data: allFloor,
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
export const getFloor = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<FloorServiceReturn> => {
  try {
    console.log("Calling find a single floor from raid_floor");
    const getSingleRaidFloor = req.query;
    const { id }: { id: number } = req.params;
    const getSingleFloor: Floor = await Floor.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: getSingleFloor,
    });

    return {
      status: "Success",
      data: getSingleFloor,
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

export const createSingleFloor = async (
  req: Request<createFloorPayload>,
  res: Response
): Promise<FloorServiceReturn> => {
  try {
    //properties on the query object and the query object is property on the request object
    const createSingleFloor = req.query;
    const createFloorPayload: createFloorPayload = req.body;
    console.log("req.body", req.body);
    //find a single pesron

    //this is the set up of paramaters for postman
    const new_floor: Floor = await Floor.create({
      floor_abbreviation: createFloorPayload.floor_abbreviation,
      floor_name: createFloorPayload.floor_name,
    });
    //this is confirming that things worked
    res.status(200).json({
      status: "Success",
      data: new_floor,
    });

    return {
      status: "Sucess",
      data: new_floor,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      data: "Floor was unable to be made:" + error,
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

/////Update
export const updateFloor = async (
  req: Request<{ id: number }, any, updateFloorPayload>,
  res: Response
): Promise<FloorServiceReturn> => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const updateFloor = req.query;
    const { id }: { id: number } = req.params;
    const updateFloorInfo: updateFloorPayload = req.body;
    console.log("req.body is reading", updateFloorInfo);

    const [affectedCount, affectedRows]: [number, Floor[]] = 
    await Floor.update(
      updateFloorInfo,
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
export const deleteRaidFloor = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<FloorServiceReturn> => {
  try {
    const deleteSingleFloor = req.query;
    const { id }: { id: number } = req.params;
    const delete_single_raid_floor: number = await Floor.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "Sucess",
      data: delete_single_raid_floor,
    });

    return {
      status: "Sucess",
      data: delete_single_raid_floor,
    };
  } catch (error) {
    res.status(500).json({
      status: "Error",
      data: "Floor was unable to be deleted:" + error,
    });
    return {
      status: "Error",
      data: error,
    };
  }
};

//createSingleLootTable({params: {gear_piece: "bracelet", gear_name:"Light-heavyweight raid ", floor_level: "m1s", source_of_gear: "Raid", itemLvl:730}}, {});
//updateLootTable({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res
