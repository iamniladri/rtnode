import express from 'express';
import bodyParser from "body-parser";
import {Product} from '../../controllers/product/product';
import {verifyToken} from "../../middleware/auth";

const product = new Product();
const create_product =  product.productAdd();  
const get_products =  product.productFetch();  
const register =  product.register(); 
const login =  product.login(); 

export const product_router = express.Router();


product_router.get("/welcomes", get_products); 
product_router.post("/create_product", create_product);
product_router.post("/register", register);
product_router.post("/login", login);

 
 