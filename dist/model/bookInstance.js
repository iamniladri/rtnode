"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookInstance = void 0;
const mongoose = require("mongoose");
const bookInstance = new mongoose.Schema({
    Books: { type: mongoose.ObjectId },
    Imprints: { type: Number },
    status: { type: String },
});
exports.BookInstance = mongoose.model("bookInstance", bookInstance);
