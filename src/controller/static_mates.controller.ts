import { UpdatedAt } from "sequelize-typescript";
import { StaticMate } from "../models/static_mates.model.js";
import { createStaticMatePayload } from "./types/static_mate_types.js";

///////Read or Pull all
export const findAllStaticMates = async (req, res) => {
  try {
    console.log("Calling find all for Static Mates");
    const allStaticMates: StaticMate[] = await StaticMate.findAll();
    return res.status(200).json({
      message: {
        status: "Sucess",
        data: "All static mates called: " + allStaticMates,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Unable get all static mates:" + error,
      },
    });
  }
};

//Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleStaticMate = async (req, res) => {
  try {
    console.log("Calling find one Static Mates");
    const find_single_static_mate: object = await StaticMate.findOne();
    res.status(200).json({
      message: {
        status: "Sucess",
        data: "Static Mate found: " + find_single_static_mate,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Failure",
        data: "Unable to find static mate" + error,
      },
    });
  }
};

///create

//adding object to createSingleStaticMate is acting weird
export const createSingleStaticMate = async (req, res) => {
  try {
    //properties on the query object and the query object is property on the request object
    const createStaticMatePayload: createStaticMatePayload = req.body;
    console.log("req.body", req.body);
    //find a single pesron
    const find_single_static_mate: object = await StaticMate.findOne({
      where: { name: createSingleStaticMate.name },
    });
    if (find_single_static_mate) {
      throw Error("There was already a user with that name");
      return;
    }
    //this is the set up of paramaters for postman
    const single_static_mate = await StaticMate.create({
      name: createStaticMatePayload.name,
      role: createStaticMatePayload.role,
    });
    return res.status(200).json({
      message: {
        status: "Sucess",
        data: "Following Static Member was created:" + single_static_mate,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Unable to make the static member:" + error,
      },
    });
  }
};

/////Update
export const updateStaticMate = async (req, res) => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const { id } = req.params;
    const { name, role } = req.body;
    console.log("req.body is reading:" + req.body);
    await StaticMate.update(req.body, {
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
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Failure",
        data: "The static member was not updated because: " + error,
      },
    });
  }
};

///////Delete
export const deleteStaticMate = async (req, res) => {
  try {
    const { id } = req.params;
    const single_static_mate = await StaticMate.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: {
        status: "Sucess",
        data: "Static member is ded. No big surprise",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: {
        status: "Error",
        data: "Unable to delete the static member?",
      },
    });
  }
};

//createSingleStaticMate({params: {static_name: "Lupin Meowikir", raid_member_role: "Caster DPS"}}, {});
//updateStaticMate({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res
