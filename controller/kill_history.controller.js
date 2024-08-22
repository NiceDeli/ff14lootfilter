import { Kill_History } from '../models/kill_history.model.js';


/////Read or Pull
export const getAll_Kill_History= async (req, res) => {
    try {
        const all_kill_history= await Kill_History.find({});
        res.status(200).json(all_kill_history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

///create
export const getSingle_Kill_History= async (res, req) => {
    try {
        const { id } = req.params;
        const single_kill_history = await Kill_History.findById(id);
        res.status(200).json(single_kill_history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const createKill = async (req, res) => {
    try {
        const single_kill_history = await Kill_History.create(req.body);
        res.status(200).json(single_kill_history);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};


///Update
export const updateKill = async (req, res) => {
    try {
        const { id } = req.params;

        const single_kill_history = await Kill_History.findByIdAndUpdate(id, req.body);

        if (!single_kill_history) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updated_kill_history = await Kill_History.findById(id);
        res.status(200).json(updated_kill_history);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


///////Delete
export const deleteKill = async (req, res) => {
    try {
        const { id } = req.params;

        const single_kill_history = await Kill_History.findByIdAndDelete(id);

        if (!single_kill_history) {
            return res.status(404).json({ message: "Product not found" });

        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
