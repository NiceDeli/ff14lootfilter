import { UpdatedAt } from 'sequelize-typescript';
import { Floor } from '../models/floor.model.js'


///////Read or Pull all
export const findAllFloor = async (req, res) => {
    try {
        console.log("Calling find all for Loot on the Table")
        const allFloor:Floor[] = await Floor.findAll();
        res.status(200).json({message: allFloor})
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
}

//Pull a SINGLE PERSON NEEDS TO BE FIXED
// export const findSingleLootTable = async (req, res) => {
//     try {
//         console.log("Calling find all for Static Mates")
// //         const allLootTables:Floor[] = await Floor.findAll();
// //         res.status(200).json({message: allLootTables})
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

///create

export const createSingleFloor = async (req, res) => {
    try {
        //properties on the query object and the query object is property on the request object 
        const { floor_acronym, floor_full_name } = req.body;
        console.log("req.body", req.body)
        //find a single pesron
        const findSingleFloor = await Floor.findOne({ where: {floor_abbreviation: floor_acronym} });
        if (findSingleFloor){
            throw Error("There was already a floor with that name")
            return
        }
        //this is the set up of paramaters for postman
        const single_floor = await Floor.create({
                floor_abbreviation: floor_acronym,
                floor_name: floor_full_name,
                createdAt: new Date(),
                updatedAt: new Date(),
        })
        //this is confirming that things worked
        if (single_floor){
            console.log("floor was created", single_floor)
        }
        else {
            throw Error("something went wrong")
        }
        res.status(200).json({message: "floor was created"});
    }
    catch (error){
        console.log("we had an error: ", error)
        res.status(500).json({ message: error.message });
    }
}

;

/////Update
export const updateFloor = async (req, res) => {
    try {
        //do a find first to see if that thing exist
        //also ends things early
        const {id} = req.params;
        const {  floor_acronym, floor_full_name } = req.body;
        console.log("req.body is reading", req.body)
        const oneFloor = await Floor.findOne({ where: {id} });
        if (!oneFloor){
            throw Error("There is no such floor")
            return
        }
        oneFloor.set({
            floor_abbreviation: floor_acronym,
            floor_name: floor_full_name,
            updatedAt: new Date(),
        })
        await oneFloor.save();
        res.status(200).json({message: "Floor was updated"});
    } catch (error) {
       res.status(500).json({ message: error.message });
    }

}

///////Delete
export const deleteRaidFloor = async (req, res) => {
    try {
        const { id } = req.params;

        const single_Raid_Floor = await Floor.destroy(
            {   
                where: {
                    floor_abbreviation: 'm1s'
                }
            }
        );

        if (!single_Raid_Floor) {
            return res.status(404).json({ message: "floor not found" });

        }
    }
    catch (error) {
    //    res.status(500).json({ message: error.message });
    }
}

//createSingleLootTable({params: {gear_piece: "bracelet", gear_name:"Light-heavyweight raid ", floor_level: "m1s", source_of_gear: "Raid", itemLvl:730}}, {});
//updateLootTable({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {}) 
//the second half is the response so you can chain controllers to each other the second object is also a res