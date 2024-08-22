import mongoose from 'mongoose';
import { AutoIncrement } from '../config/db';

const Desirable_Loot_Schema = new mongoose.Schema({
    piece: {
        type: String,
        required: [true, "What do you already have"],
        default: ""
    },
    type: {
        type: String,
        required: [true, "Please enter type (crafted, raid, etc.)"],
        default: ""
    },
    floor_count: {
        type: String,
        required: [true, "What floor is said piece/upgrade mat on"],
        default: ""
    },
});


// Apply AutoIncrement plugin
Desirable_Loot_Schema.plugin(AutoIncrement, { inc_field: 'id' });

export const Desirable_Loot = mongoose.model("Desirable_Loot", Desirable_Loot_Schema);
