import mongoose from 'mongoose';

const Kill_History_Schema = new mongoose.Schema(
    {
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

export const Kill_History = mongoose.model("Loot_History", Kill_History_Schema);
