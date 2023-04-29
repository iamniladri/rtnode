const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    family_name: { type: String, default: null },
    date_of_birst: { type: Date },
    email: { type: String },
 
});

export const Author = mongoose.model("author", authorSchema);
 