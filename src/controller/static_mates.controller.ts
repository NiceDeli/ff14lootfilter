import { UpdatedAt } from "sequelize-typescript";
import { StaticMate } from "../models/static_mates.model.js";
import {
  createStaticMatePayload,
  updateStaticMatePayload,
  StaticMateServiceReturn,
  deleteStaticMatePayload,
  findStaticMatePayload,
} from "./types/static_mate_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express

///////Read or Pull all
export const findAllStaticMates = async (
  req: Request<{ id: string }, any, findStaticMatePayload>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    console.log("Calling find all for Static Mates");
    const allStaticMates: StaticMate[] = await StaticMate.findAll({
      order: [["id", "asc"]],
    });
    res.status(200).json({
      message: {
        status: "Sucess",
        data: allStaticMates,
      },
    });
    return {
      status: "Sucess",
      data: "Static mates were found!",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: +error.message,
      },
    });
    return {
      status: "Error",
      data: error.message,
    };
  }
};

//Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleStaticMate = async (
  req: Request<{ id: string }, any, findStaticMatePayload>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    console.log("Calling find one Static Mates");
    const find_single_static_mate: object = await StaticMate.findOne();
    res.status(200).json({
      message: {
        status: "Sucess",
        data: "Static Mate found: " + find_single_static_mate,
      },
    });
    return {
      status: "Sucess!",
      data: "Static mate was found",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Failure",
        data: "Unable to find static mate" + error,
      },
    });
    return {
      status: "Error",
      data: error.message,
    };
  }
};

///create

//adding object to createSingleStaticMate is acting weird
export const createSingleStaticMate = async (
  req: Request<{ name: string; role: string }, any, createStaticMatePayload>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    //properties on the query object and the query object is property on the request object
    const createStaticMatePayload: createStaticMatePayload = req.body;
    console.log("req.body", req.body);
    const single_static_mate = await StaticMate.create({
      name: createStaticMatePayload.name,
      role: createStaticMatePayload.role,
    });

    res.status(200).json({
      message: {
        status: "Sucess",
        data: single_static_mate,
      },
    });
    return {
      status: "Sucess",
      data: "Static Mate was made!",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: error,
      },
    });
    return {
      status: "Error",
      data: error.message,
    };
  }
};

/////Update
export const updateStaticMate = async (
  req: Request<{ id: string }, any, updateStaticMatePayload>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const { id }: { id: string } = req.params;
    const updateStaticMateInfo: updateStaticMatePayload = req.body;
    console.log("req.body is reading:", updateStaticMateInfo);
    await StaticMate.update(updateStaticMateInfo, {
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: {
        status: "Sucess",
        data: "The static member was updated!",
      },
    });
    return {
      status: "Sucess",
      data: "Static Member was updated yay~",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "The static member was not updated because: " + error,
      },
    });

    return {
      status: "Error",
      data: error.message,
    };
  }
};

///////Delete
//export const deleteStaticMate = async (req: Request<(id: string), any, deleteStaticMatePayload>, res:Response): Promise<StaticMateServiceReturn> => {
export const deleteStaticMate = async (
  req: Request<{ id: string }, any, deleteStaticMatePayload>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    const { id }: { id: string } = req.params;
    const deleteStaticMateInfo: deleteStaticMatePayload = req.body;
    console.log("req.body is reading:", deleteStaticMateInfo);
    const single_static_mate = await StaticMate.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: {
        status: "Sucess",
        data: "Static member is ded. No big surprise",
      },
    });
    return {
      status: "Sucess",
      data: "Static mate was deleted!",
    };
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Unable to delete the static member?",
      },
    });
    return {
      status: "Error",
      data: error.message,
    };
  }
};

//createSingleStaticMate({params: {static_name: "Lupin Meowikir", raid_member_role: "Caster DPS"}}, {});
//updateStaticMate({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res
