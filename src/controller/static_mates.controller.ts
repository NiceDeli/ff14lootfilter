import { UpdatedAt } from 'sequelize-typescript';
import { StaticMate } from '../models/static_mates.model.js'


///////Read or Pull all
export const findAllStaticMates = async (req, res) => {
    try {
        console.log("Calling find all for Static Mates")
        const allStaticMates:StaticMate[] = await StaticMate.findAll();
        res.status(200).json({message: allStaticMates})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Pull a SINGLE PERSON NEEDS TO BE FIXED
export const findSingleStaticMate = async (req, res) => {
    try {
        console.log("Calling find all for Static Mates")
        const allStaticMates:StaticMate[] = await StaticMate.findAll();
        res.status(200).json({message: allStaticMates})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

///create

export const createSingleStaticMate = async (req, res) => {
    try {
        //properties on the query object and the query object is property on the request object 
        const { static_name, raid_member_role } = req.body;
        //console.log("req.body", req.body)
        //find a single pesron
        const sM = await StaticMate.findOne({ where: {name: static_name} });
        if (sM){
            throw Error("There was already a user with that name")
            return
        }
        //this is the set up of paramaters for postman
        const single_static_mate = await StaticMate.create({
                name: static_name ,
                role: raid_member_role,
                createdAt: new Date(),
                updatedAt: new Date(),
        })
        //this is confirming that things worked
        if (single_static_mate){
            console.log("user was created", single_static_mate)
        }
        else {
            throw Error("something went wrong")
        }
        res.status(200).json({message: "static member was created"});
    }
    catch (error){
        console.log("we had an error: ", error)
        res.status(500).json({ message: error.message });
    }
}

;

/////Update
export const updateStaticMate = async (req, res) => {
    try {
        //do a find first to see if that thing exist
        //also ends things early
        const {id} = req.params;
        const {static_name, raid_member_role} = req.body;
        console.log("req.body is reading", req.body)
        const sM = await StaticMate.findOne({ where: {id} });
        if (!sM){
            throw Error("There is no such user")
            return
        }
        sM.set({
            name: static_name,
            role: raid_member_role
        })
        await sM.save();
        res.status(200).json({message: "static member was updated"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

///////Delete
export const deleteStaticMate = async (req, res) => {
    try {
        const { id } = req.params;

        const single_static_mate = await StaticMate.destroy(
            {   
                where: {
                    name: 'Tye Nomad'
                }
            }
        );

        if (!single_static_mate) {
            return res.status(404).json({ message: "Product not found" });

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//createSingleStaticMate({params: {static_name: "Lupin Meowikir", raid_member_role: "Caster DPS"}}, {});
//updateStaticMate({query: {id: 4 ,static_name: "Higgs", raid_member_role: "Ranged DPS"}}, {}) 
//the second half is the response so you can chain controllers to each other the second object is also a res