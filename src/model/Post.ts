const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
	   title: { type: String, default: null },
       comments:[{ type: mongoose.ObjectId, ref: 'Comment', required: true }]  

   });

export const Post = mongoose.model('Post', postSchema);