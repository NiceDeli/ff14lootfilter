import { Loot_History } from '../models/loot_history.model.js';


/////Read or Pull
export const getAll_Loot_History= async (req, res) => {
    try {
        const all_loot_history = await Loot_History.find({});
        res.status(200).json(all_loot_history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

///create
export const getSingle_Loot_History = async (res, req) => {
    try {
        const { id } = req.params;
        const single_loot_history = await Loot_History.findById(id);
        res.status(200).json(single_loot_history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createLoot = async (req, res) => {
    try {
        const single_loot_history = await Loot_History.create(req.body);
        res.status(200).json(single_loot_history);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


///Update
export const updateLoot = async (req, res) => {
    try {
        const { id } = req.params;

        const single_loot_history = await Loot_History.findByIdAndUpdate(id, req.body);

        if (!single_loot_history) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updated_loot_history = await Loot_History.findById(id);
        res.status(200).json(updated_loot_history);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


///////Delete
export const deleteLoot = async (req, res) => {
    try {
        const { id } = req.params;

        const single_loot_history = await Loot_History.findByIdAndDelete(id);

        if (!single_loot_history) {
            return res.status(404).json({ message: "Product not found" });

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
