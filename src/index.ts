import * as dotenv from 'dotenv';
dotenv.config();
import {connect} from './config/database';
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import {product_router}  from './routes/product/product'
 
 
 
const app = express();
 connect(); 
 



app.use(bodyParser.urlencoded({ extended: false }))

//app.use(express.static('/public'));
 
app.get("/", (req, res ,next) =>{

        
      res.status(200).sendFile(path.resolve(__dirname, 'public/html/', 'contactus.html'));
 
 
});
app.get("/login", (req, res ,next) =>{

        
  res.status(200).sendFile(path.resolve(__dirname, 'public/html/', 'login.html'));


});
 
app.use(product_router)


   
  
 
app.listen(3000);
console.log("server listen at port 3000")