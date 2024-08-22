import mongoose from 'mongoose';
//im actually not 100% sure on the logic here...
const Loot_History_Schema = new mongoose.Schema(
    {
        //name of gear (rings, chest, etc.)
        //maybe here I can make it so people input this data with a dropdown menu with <select> in html
        pieces: {
            type: String,
            required: [true, "what they already have"],
            default: 0
        },
        //what type of gear (crafted, tome, raid, etc.)
        //maybe here I can make it so people input this data with a dropdown menu with <select> in html
        floor: {
            type: String,
            required: [true, "How many times are we "],
            default: 0
        },
        death_count: {
            type: String,
            required: [true, "what week are we on or clear # did the boss die on"],
            default : 0
        },
        
    },
);

export const Loot_History = mongoose.model("Loot_History", Loot_History_Schema);

/*
const killHistoryTable = [
  //m1s
  {
    id: 1, //primary key 
    turn_id: 1, //what floor (ie m1s, m2s, etc.)
    number_of_times_killed: 1, //aka week 1, week 2, etc.
    date_killed: '2024-07-30', //litteral time might not be needed
  },

  */