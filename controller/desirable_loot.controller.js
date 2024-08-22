import { Desirable_Loot } from '../models/desirable_loot.model.js';


/////Read or Pull
export const getAll_Desirable_Loot= async (req, res) => {
    try {
        const all_desirable_loot= await Desirable_Loot.find({});
        res.status(200).json(all_desirable_loot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

///create
export const getSingle_Desirable_Loot= async (res, req) => {
    try {
        const { id } = req.params;
        const single_desirable_loot = await Desirable_Loot.findById(id);
        res.status(200).json(single_desirable_loot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const create_Desirable_Loot = async (req, res) => {
    try {
        const single_desirable_loot = await Desirable_Loot.create(req.body);
        res.status(200).json(single_desirable_loot);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


///Update
export const updated_Desirable_Loot = async (req, res) => {
    try {
        const { id } = req.params;

        const single_desirable_loot = await Desirable_Loot.findByIdAndUpdate(id, req.body);

        if (!single_desirable_loot) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updated_desirable_loot = await Desirable_Loot.findById(id);
        res.status(200).json(updated_desirable_loot);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


///////Delete
export const delete_Desirable_Loot = async (req, res) => {
    try {
        const { id } = req.params;

        const single_desirable_loot = await Desirable_Loot.findByIdAndDelete(id);

        if (!single_desirable_loot) {
            return res.status(404).json({ message: "Product not found" });

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}