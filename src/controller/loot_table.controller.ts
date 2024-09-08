import { UpdatedAt } from 'sequelize-typescript';
import { LootTable } from '../models/loot_table.model.js'


///////Read or Pull all
export const findAllLootTable = async (req, res) => {
    try {
        console.log("Calling find all for Loot on the Table")
        const allLootTables:LootTable[] = await LootTable.findAll();
        res.status(200).json({message: allLootTables})
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
}

//Pull a SINGLE PERSON NEEDS TO BE FIXED
// export const findSingleLootTable = async (req, res) => {
//     try {
//         console.log("Calling find all for Static Mates")
// //         const allLootTables:LootTable[] = await LootTable.findAll();
// //         res.status(200).json({message: allLootTables})
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

///create

export const createSingleLootTable = async (req, res) => {
    try {
        //properties on the query object and the query object is property on the request object 
        const { gear_piece, gear_name, floor_level, source_of_gear, itemLvl } = req.body;
        console.log("req.body", req.body)
        //find a single pesron
        const findSingleLootTable = await LootTable.findOne({ where: {name_of_gear: gear_name} });
        if (findSingleLootTable){
            throw Error("There was already loot piece with that name")
            return
        }
        //this is the set up of paramaters for postman
        const single_loot_piece = await LootTable.create({
                piece_type: gear_piece,
                name_of_gear: gear_name,
                floor_id: floor_level,
                gear_source: source_of_gear,
                iLvl: itemLvl,
                createdAt: new Date(),
                updatedAt: new Date(),
        })
        //this is confirming that things worked
        if (single_loot_piece){
            console.log("loot piece was created", single_loot_piece)
        }
        else {
            throw Error("something went wrong")
        }
        res.status(200).json({message: "loot piece was created"});
    }
    catch (error){
        console.log("we had an error: ", error)
        res.status(500).json({ message: error.message });
    }
}

;

/////Update
export const updateLootTable = async (req, res) => {
    try {
        //do a find first to see if that thing exist
        //also ends things early
        const {id} = req.params;
        const {  gear_piece, gear_name, floor_level, source_of_gear, itemLvl } = req.body;
        console.log("req.body is reading", req.body)
        const sM = await LootTable.findOne({ where: {id} });
        if (!sM){
            throw Error("There is no such item")
            return
        }
        sM.set({
            piece_type: gear_piece,
            name_of_gear: gear_name,
            floor_id: floor_level,
            gear_source: source_of_gear,
            iLvl: itemLvl,
        })
        await sM.save();
        res.status(200).json({message: "item was updated"});
    } catch (error) {
       res.status(500).json({ message: error.message });
    }

}

// ///////Delete
// export const deleteLootTable = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const single_static_mate = await LootTable.destroy(
//             {   
//                 where: {
//                     //name: 'Tye Nomad'
//                 }
//             }
//         );

//         if (!single_static_mate) {
//             return res.status(404).json({ message: "Product not found" });

//         }
//     }
//     catch (error) {
//     //    res.status(500).json({ message: error.message });
//     }
// }

//createSingleLootTable({params: {gear_piece: "bracelet", gear_name:"Light-heavyweight raid ", floor_level: "m1s", source_of_gear: "Raid", itemLvl:730}}, {});
//updateLootTable({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {}) 
//the second half is the response so you can chain controllers to each other the second object is also a res