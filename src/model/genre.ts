const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: { type: String, default: null },
    url: { type: String, default: null },
    
 
});

export const Genre = mongoose.model("genre", genreSchema);
 