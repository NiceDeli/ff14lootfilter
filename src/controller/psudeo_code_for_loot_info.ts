// import { CurrentLoot } from "../models/current_loot.model";
// import { DesirableLoot } from "../models/desirable_loot.model";

// //Id put this into static_mate_controller i want to believe
// export const findStaticMateWithLootInfo = async (
//   req: Request<{ id: number }, {}, {}, findStaticMatePayload>,
//   res: Response
// ): Promise<StaticMateServiceReturn> => {
//   try {
//     const getAllStaticMates: findStaticMatePayload = req.query;
//     console.log("Calling find one Static Mates");
//     const { id }: { id: number } = req.params;
//     const find_single_static_mate_loot_info: StaticMate = await StaticMate.findOne({
//       where: {
//         id: id,
//       },
//      //here I would tell it to return only these models if they have the static_mate_id = id... 
//      //however the way i have the current and desirable have the foreign keys named as static_mate_id maybe i should 
//      //change the name of the id too?
//      //here I could also do possibly
//      /*
//     StaticMate.findAll({
//     include: [{
//     model: CurrentLoot,
//     }]
//     })


//      */
//       include: [{ model: DesirableLoot, CurrentLoot }],
//     });
//     res.status(200).json({
//       status: "Sucess",
//       data: find_single_static_mate_loot_info,
//     });
//     return {
//       status: "Sucess",
//       data: find_single_static_mate_loot_info,
//     };
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: {
//         status: "Failure",
//         data: error,
//       },
//     });

//     return {
//       status: "Error",
//       data: error.message,
//     };
//   }
// };
