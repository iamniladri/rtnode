"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const user_1 = require("../../model/user");
const Post_1 = require("../../model/Post");
const Comment_1 = require("../../model/Comment");
const bson_1 = require("bson");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class Product {
    /* product class*/
    contructor() {
    }
    register() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user input
                const { first_name, last_name, email, password } = req.body;
                console.log("user", req.body);
                // Validate user input
                if (!(email && password && first_name && last_name)) {
                    return res.status(400).send("All ff input is required");
                }
                // check if user already exist
                // Validate if user exist in our database
                const oldUser = yield user_1.User.findOne({ email });
                if (oldUser) {
                    return res.status(409).send("User Already Exist. Please Login");
                }
                //Encrypt user password
                const encryptedPassword = yield bcrypt.hash(password, 10);
                // Create user in our database
                const user = yield user_1.User.create({
                    first_name,
                    last_name,
                    email: email.toLowerCase(),
                    password: encryptedPassword,
                });
                // Create token
                const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                });
                // save user token
                user.token = token;
                // return new user
                return res.status(201).json(user);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    login() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user input
                const { email, password } = req.body;
                // Validate user input
                if (!(email && password)) {
                    return res.status(400).send("All input is required");
                }
                // Validate if user exist in our database
                const user = yield user_1.User.findOne({ email });
                if (user && (yield bcrypt.compare(password, user.password))) {
                    // Create token
                    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
                        expiresIn: "2h",
                    });
                    // save user token
                    user.token = token;
                    // user
                    return res.status(200).json(user);
                }
                return res.status(400).send("Invalid Credentials");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    productAdd() {
        return (req, res) => {
            console.log("ddd", req.body);
            res.status(200).send({ records: req.body });
        };
    }
    productFetch() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({});
            const comment = new Comment_1.Comment({ 'title': 'sample comment', 'user': new bson_1.ObjectId(user._id) });
            comment.save();
            const post = new Post_1.Post({ 'title': 'Sample', 'comments': [comment._id] });
            post.save();
            const postResult = yield Post_1.Post.find({}).populate({
                path: 'comments',
                options: { limit: 2, skip: 1 },
                populate: {
                    path: 'user',
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
        });
    }
}
exports.Product = Product;
