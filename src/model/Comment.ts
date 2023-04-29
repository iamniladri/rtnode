const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
	   title: { type: String, default: null },
       user:{ type: mongoose.ObjectId, ref: 'user', required: true }
   });

 

export const Comment = mongoose.model('Comment', commentSchema);