import { Loot_Table } from '../models/loot_table.model.js';
//^^this is pulling the model from the loot_table.model.js we made

/////Read or Pull
export const getMany_Loot = async (req, res) => {
    try {
        const many_loot = await Loot_Table.find({});
        res.status(200).json(many_loot);
        //this is calling the imported Loot_Table at the top to use the .find function for all the loot
    } catch (error) {
        res.status(500).json({ message: error.message });
        //if the above doesnt work then itll "catch" the error and tell us what is wrong
    }
}

///create
export const getSingle_Loot = async (res, req) => {
    try {
        const { id } = req.params;
        const single_loot = await Loot_Table.findById(id);
        res.status(200).json(single_loot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createLoot = async (req, res) => {
    try {
        const single_loot = await Loot_Table.create(req.body);
        res.status(200).json(single_loot);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


///Update
export const updateLoot = async (req, res) => {
    try {
        const { id } = req.params;

        const single_loot = await Loot_Table.findByIdAndUpdate(id, req.body);

        if (!single_loot) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updated_single_loot = await Loot_Table.findById(id);
        res.status(200).json(updated_single_loot);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


///////Delete
export const deleteLoot = async (req, res) => {
    try {
        const { id } = req.params;

        const single_loot = await Loot_Table.findByIdAndDelete(id);

        if (!single_loot) {
            return res.status(404).json({ message: "Product not found" });

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
