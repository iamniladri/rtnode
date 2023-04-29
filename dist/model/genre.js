"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const mongoose = require("mongoose");
const genreSchema = new mongoose.Schema({
    name: { type: String, default: null },
    url: { type: String, default: null },
});
exports.Genre = mongoose.model("genre", genreSchema);
