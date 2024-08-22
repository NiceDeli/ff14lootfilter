import mongoose from 'mongoose';
import { AutoIncrement } from '../config/db.js';

const Static_Mates_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter static member"],
        default: ""
    },
    role: {
        type: String,
        required: true,
        default: ""
    },
    image: {
        type: String,
        required: false
    },
});

// Ensure AutoIncrement is initialized before using it
if (AutoIncrement) {
    Static_Mates_Schema.plugin(AutoIncrement, { inc_field: 'id' });
} else {
    console.error("AutoIncrement plugin is not initialized");
}

export const Static_Mates = mongoose.model("Static_Mates", Static_Mates_Schema);
