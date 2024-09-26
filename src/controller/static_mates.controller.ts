import { StaticMate } from "../models/static_mates.model.js";
import {
  createStaticMatePayload,
  updateStaticMatePayload,
  StaticMateServiceReturn,
  deleteStaticMatePayload,
  findStaticMatePayload,
} from "./types/static_mate_types.js";
import { Request, Response } from "express"; // Make sure you are importing from express
import { errorMonitor } from "stream";

///////Read or Pull all
export const findAllStaticMates = async (
  req: Request,
  res: Response
): Promise<StaticMateServiceReturn> => {

  try {
    //finaAllStaticMates = static_name, raid_member_role
    const getAllStaticMates = req.query;
    console.log("Calling find all for Static Mates");
    const getStaticMates: StaticMate[] = await StaticMate.findAll({
      where: getAllStaticMates,  //static_name, raid_member_role
      order: [["id", "asc"]],
    });
    res.status(200).json({
      message: {
        status: "Sucess",
        data: getAllStaticMates,
      },
    });
    return {
      status: "Sucess",
      data: getStaticMates,
    };
  } catch (error) {
    console.error(error);
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

//Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleStaticMate = async (
  req: Request<{ id: number }>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    const getSingleStaticMember = req.query;
    console.log("Calling find one Static Mates");
    const { id }: { id: number } = req.params;
    const find_single_static_mate: StaticMate = await StaticMate.findOne(
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({
        status: "Sucess",
        data: find_single_static_mate,
    });
    return {
      status: "Sucess",
      data: find_single_static_mate,
    };

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: {
        status: "Failure",
        data: error,
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
  req: Request<{ createStaticMatePayload }>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    //properties on the query object and the query object is property on the request object
    const createSingleStaticMate = req.query;
    const default_fields: string[] = Object.keys(createSingleStaticMate);
    const REQUIRED_STATIC_MATE_FIELDS: string[] =[
      'name',
      'role'
    ];
    const missingFields: string [] = difference(REQUIRED_STATIC_MATE_FIELDS, default_fields);
    if (missingFields.length ! == 0){
      return{
        status: 'Error',
        data: 'Missing required fields:' 
      }
    };

    const createStaticMatePayload: createStaticMatePayload = req.body;
    console.log("req.body", req.body);

    const single_static_mate: StaticMate = await StaticMate.create({
      name: createStaticMatePayload.name,
      role: createStaticMatePayload.role,
    });

    res.status(200).json({
      message: {
        status: "Success",
        data: single_static_mate,
      },
    });

    return {
      status: "Sucess",
      data: single_static_mate,

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
  req: Request<{ id: number }, any, updateStaticMatePayload>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    //do a find first to see if that thing exist
    //also ends things early
    const updateStaticMate = req.query;
    const { id }: { id: number } = req.params;
    const updateStaticMateInfo: updateStaticMatePayload = req.body;
    console.log("req.body is reading:", updateStaticMateInfo);
    const [affectedCount, affectedRows]: [number, StaticMate[]] = await StaticMate.update(
      updateStaticMateInfo,
      {
        where: {
          id: id,
        },
        returning: true,
      }
    );

    res.status(200).json({
      message: {
        status: "Sucess",
        data: affectedRows,
      },
    });
    return {
      status: "Sucess",
      data: affectedRows,
    };

  } catch (error) {
    console.error(error);
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
  req: Request<{ id: string }>,
  res: Response
): Promise<StaticMateServiceReturn> => {
  try {
    const deleteStaticMate = req.query;
    const { id }: { id: string } = req.params;
    const delete_static_mate: number = await StaticMate.destroy({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: {
        status: "Sucess",
        data: delete_static_mate,
      },
    });
    return {
      status: "Sucess",
      data: delete_static_mate,
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
      data: error,
    };
  }
};

//createSingleStaticMate({params: {static_name: "Lupin Meowikir", raid_member_role: "Caster DPS"}}, {});
//updateStaticMate({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {})
//the second half is the response so you can chain controllers to each other the second object is also a res


// for(const key in getAllStaticMates) {
//   if(!unit_keys.includes(key) {
//   return {
//   status: 'Error',
//   data:  Invalid Field ${keys}
  
// }
//   }
  
//   }