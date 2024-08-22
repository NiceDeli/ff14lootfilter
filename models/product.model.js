import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "plz enter product name"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },

        image: {
            type: String,
            required: false
        },
    },
);

export const Product = mongoose.model("Product", ProductSchema);

//holy shit please double check spellings. litterally
//spent 20 mins finding out that this wasnt working because it was export and not exports
// module.exports = Product;