import mongoose from 'mongoose';
import { AutoIncrement } from '../config/db.js';

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
        type: Number,
        required: [true, "What floor is said piece/upgrade mat on"],
        default: ""
    },
});


// Ensure AutoIncrement is initialized before using it
if (AutoIncrement) {
    Desirable_Loot_Schema.plugin(AutoIncrement, { inc_field: 'id' });
} else {
    console.error("AutoIncrement plugin is not initialized");
}

//Apply AutoIncrement plugin
Desirable_Loot_Schema.plugin(AutoIncrement, { inc_field: 'id' });

export const Desirable_Loot = mongoose.model("Desirable_Loot", Desirable_Loot_Schema);
