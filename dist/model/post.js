"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: { type: String, default: null },
    comments: [{ type: mongoose.ObjectId, ref: 'Comment', required: true }]
});
exports.Post = mongoose.model('Post', postSchema);
