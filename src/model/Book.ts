const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, default: null },
  authors: { type: Array},
  summary: { type: String, default: null },
  isbn: { type: String },
  genres: { type: Array },
});

export const Book = mongoose.model("Book", bookSchema);

 