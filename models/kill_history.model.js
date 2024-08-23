import mongoose from 'mongoose';
import { AutoIncrement } from '../config/db.js';

const Kill_History_Schema = new mongoose.Schema(
    {
        kill_history_id: {
            type: Number,  // This will be the auto-incremented field
        },
        //name of gear (rings, chest, etc.)
        //maybe here I can make it so people input this data with a dropdown menu with <select> in html
        piece: {
            type: String,
            required: [true, "plz enter gear"],
            default: 0
        },
        //what type of gear (crafted, tome, raid, etc.)
        //maybe here I can make it so people input this data with a dropdown menu with <select> in html
        floor: {
            type: String,
            required: [true, "What floor/turn are we on?"],
            default: 0
        },
        death_count: {
            type: String,
            required: [true, "what week are we on or clear # did the boss die on"],
            default : 0
        },
        
    },
);

// Ensure AutoIncrement is initialized before using it
if (AutoIncrement) {
    Kill_History_Schema.plugin(AutoIncrement, { inc_field: 'kill_history_id' });
} else {
    console.error("AutoIncrement plugin is not initialized");
}

export const Kill_History = mongoose.model("Loot_History", Kill_History_Schema);
