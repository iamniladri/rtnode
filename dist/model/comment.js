"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    title: { type: String, default: null },
    user: { type: mongoose.ObjectId, ref: 'user', required: true }
});
exports.Comment = mongoose.model('Comment', commentSchema);
