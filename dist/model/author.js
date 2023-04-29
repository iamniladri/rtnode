"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    family_name: { type: String, default: null },
    date_of_birst: { type: Date },
    email: { type: String },
});
exports.Author = mongoose.model("author", authorSchema);
