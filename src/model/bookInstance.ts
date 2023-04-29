const mongoose = require("mongoose");

const bookInstance = new mongoose.Schema({
  Books: { type: mongoose.ObjectId},
  Imprints: { type: Number},
  status: { type: String },
   
});

export const BookInstance = mongoose.model("bookInstance", bookInstance);

 