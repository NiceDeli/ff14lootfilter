import { StaticMate } from '../models/static_mates.model.js'


// /////Read or Pull
export const findAllStaticMates = async (req, res) => {
    try {
        console.log("Calling find all for Static Mates")

        const allStaticMates:StaticMate[] = await StaticMate.findAll();

        res.status(200).json({message: allStaticMates})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// ///create
// export const getSingle_Static_Mate = async (res, req) => {
//     try {
//         const { id } = req.params;
//         const single_static_mate = await Static_Mates.findById(id);
//         res.status(200).json(single_static_mate);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
// export const createStatic_Mate = async (req, res) => {
//     try {
//         const single_static_mate = await Static_Mates.create(req.body);
//         res.status(200).json(single_static_mate);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// };


// ///Update
// export const updateStatic_Mate = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const single_static_mate = await Static_Mates.findByIdAndUpdate(id, req.body);

//         if (!single_static_mate) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//         const updated_static_mate = await Static_Mates.findById(id);
//         res.status(200).json(updated_static_mate);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }


// ///////Delete
// export const deleteStatic_Mate = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const single_static_mate = await Static_Mates.findByIdAndDelete(id);

//         if (!single_static_mate) {
//             return res.status(404).json({ message: "Product not found" });

//         }
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
