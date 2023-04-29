import {Book} from '../../model/Book';
import {Author} from '../../model/author';
import {Genre} from '../../model/genre';
import {BookInstance} from '../../model/bookInstance';
import {User} from '../../model/user';
import {Post} from '../../model/Post';
import {Comment} from '../../model/Comment';
import { ObjectId } from 'bson';
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


export class Product {
/* product class*/

	contructor(){


		
	}

	register(){

		return async (req:any, res:any) => {
			try {
			  // Get user input
			  const { first_name, last_name, email, password } = req.body;
			  
			  console.log("user",req.body);
			  // Validate user input
			  if (!(email && password && first_name && last_name)) {
				 return res.status(400).send("All ff input is required");
			  }
		  
			  // check if user already exist
			  // Validate if user exist in our database
			  const oldUser = await User.findOne({ email });
		  
			  if (oldUser) {
				return res.status(409).send("User Already Exist. Please Login");
			  }
		  
			  //Encrypt user password
			  const encryptedPassword = await bcrypt.hash(password, 10);
		  
			  // Create user in our database
			  const user = await User.create({
				first_name,
				last_name,
				email: email.toLowerCase(), // sanitize: convert email to lowercase
				password: encryptedPassword,
			  });
		  
			  // Create token
			  const token = jwt.sign(
				{ user_id: user._id, email },
				process.env.TOKEN_KEY,
				{
				  expiresIn: "2h",
				}
			  );
			  // save user token
			  user.token = token;
		  
			  // return new user
			  return res.status(201).json(user);
			} catch (err) {
			  console.log(err);
			}
		  }
	}

   login(){

	return  async (req:any, res:any) => {
		try {
		  // Get user input
		  const { email, password } = req.body;
	  
		  // Validate user input
		  if (!(email && password)) {
			 return res.status(400).send("All input is required");
		  }
		  // Validate if user exist in our database
		  const user = await User.findOne({ email });
	  
		  if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			const token = jwt.sign(
			  { user_id: user._id, email },
			  process.env.TOKEN_KEY,
			  {
				expiresIn: "2h",
			  }
			);
	  
			// save user token
			user.token = token;
	  
			// user
			return res.status(200).json(user);
		  }
		  return res.status(400).send("Invalid Credentials");
		} catch (err) {
		  console.log(err);
		}
	  }
   }
	  
 
	productAdd(){
     
     return (req:any, res:any)=> {
			  console.log("ddd",req.body)
			   res.status(200).send({records:req.body});
			};

	}

	productFetch(){

		return async (req:any, res:any) => {

             const user = await User.findOne({});

              const comment = new Comment({'title':'sample comment','user':new ObjectId(user._id)})	
                 
              comment.save();

              const post = new Post({'title':'Sample','comments':[comment._id]})

              post.save();

              const postResult = await Post.find({}).populate({
              	                                               path: 'comments',
                                                               options: { limit: 2 ,skip:1 },
                                                               populate	:{
                                                               	  path:'user',
                                                               	  select: '-__v -password'

                                                               },
                                                                select: '-__v'
                                                               
              	                                              });
/*
			const book_result = await Book.find({})		
			const author_result = await Author.find({})
			const genreInstance =await Genre.find({});
		
		
		
			const bookInstance =await BookInstance.aggregate([
			 { "$lookup": {
			   "from": "books",
			   "let": { "bookId": "$Books" },
			   "pipeline": [
				 { "$match": { "$expr": { "$eq": ["$_id", "$$bookId"] }}},
				 { "$lookup": {
				   "from": "authors",
				   "let": { "authorIds": "$authors" },
				   "pipeline": [
					 { "$match": { "$expr": { "$in": ["$_id", "$$authorIds"] }}},
		   
				   
		   
				   ],
				   "as": "authors"
				 }},
			  { "$lookup": {
						 "from": "genres",
						  "let": { "genreIds" :"$genres" },
						 "pipeline": [
						   { "$match": { "$expr": { "$in": ["$_id", "$$genreIds"] }}}
						   
						 ],
						 "as": "genres"
					   }}
					 
			   ],
			   "as": "Books"
			 }},
			
		   ])
		*/	
			return res.status(200).send(postResult);
		  }

     
 

	}
}