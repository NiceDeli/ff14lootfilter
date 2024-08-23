import mongoose from 'mongoose';
import { AutoIncrement } from '../config/db.js';

const Loot_Table_Schema = new mongoose.Schema(
    {
        //name of gear (rings, chest, etc.)
        //maybe here I can make it so people input this data with a dropdown menu with <select> in html
        piece: {
            type: String,
            required: [true, "plz enter gear"],
            default: 0
        },
        //what type of gear (crafted, tome, raid, etc.)
        type: {
            type: String,
            required: [true, "please enter type (crafted, raid, etc.)"],
            default: 0
        },
        //maybe need to add what floor the loot comes from IE accessories on m1s etc. etc.
        image: {
            type: String,
            required: false
        },
    },
);

console.log("Loot table model initialized")
// Ensure AutoIncrement is initialized before using it
if (AutoIncrement) {
    Loot_Table_Schema.plugin(AutoIncrement, { inc_field: 'loot_table_id' });
} else {
    console.error("AutoIncrement plugin is not initialized");
}

export const Loot_Table = mongoose.model("Loot Table", Loot_Table_Schema );

/*
const Loot_Table_Schema = new mongoose.Schema ( [
    ///raid drops
    gear:{
      id: 1,
      name: 'raid Earring',
      ilvl: 730,
    },
    {
      id: 2,
      name: 'raid Ring',
      ilvl: 730,
    },
    { 
      id: 3,
      name: 'raid bracelet',
      ilvl: 730,
    },
    { 
      id: 4,
      name: 'raid necklace',
      ilvl: 730
    },
    { 
      id: 5,
      name: 'raid boots',
      ilvl: 730
    },
    { 
     id: 6,
     name: 'raid arms',
     ilvl: 730
    },
    { 
     id: 7,
     name: 'raid head',
     ilvl: 730
    },
    { 
     id: 8,
     loot: 'raid chest',
     ilvl: 730
    },
    { 
     id: 9,
     loot: 'raid pants',
     ilvl: 730
    },
    { 
     id: 10,
     loot: 'raid twine',
     ilvl: 730
    },
    { 
     id: 11,
     loot: 'raid shine',
     ilvl: 730
    },
  ///crafted stuff 
  {
    id: 12,
    name: 'crafted Earring',
    ilvl: 730,
  },
  {
    id: 13,
    name: 'crafted Ring',
    ilvl: 730,
  },
  { 
    id: 14,
    name: 'crafted bracelet',
    ilvl: 730,
  },
  { 
    id: 15,
    name: 'crafted necklace',
    ilvl: 730
  },
  { 
    id: 16,
    name: 'crafted boots',
    ilvl: 730
  },
  { 
   id: 17,
   name: 'crafted arms',
   ilvl: 730
  },
  { 
   id: 18,
   name: 'crafted head',
   ilvl: 730
  },
  { 
   id: 19,
   loot: 'crafted chest',
   ilvl: 730
  },
  { 
   id: 20,
   loot: 'crafted pants',
   ilvl: 730
  },
  
    ]
)

*/