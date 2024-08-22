import mongoose from 'mongoose';
import { AutoIncrement } from '../config/db.js'

const Static_Mates_Schema = new mongoose.Schema(
    {
        //members name
        name: {
            type: String,
            required: [true, "plz enter static member"],
            default: 0
        },
        //role (dps, support, etc.)
        role: {
            type: String,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        },

    },
);

// Apply AutoIncrement plugin
// Ensure that AutoIncrement is defined and correctly applied
console.log("I am in static mates")

if (AutoIncrement) {
    Static_Mates_Schema.plugin(AutoIncrement, { inc_field: 'id' });
} else {
    console.error("AutoIncrement is not initialized");
}

export const Static_Mates = mongoose.model("Static_Mates", Static_Mates_Schema);


