"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: { type: String, default: null },
    authors: { type: Array },
    summary: { type: String, default: null },
    isbn: { type: String },
    genres: { type: Array },
});
exports.Book = mongoose.model("Book", bookSchema);
