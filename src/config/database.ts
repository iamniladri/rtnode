import * as mongoose from "mongoose";
const RConnect:any = process.env.MONGO_URI;
export const connect = () => {
  // Connecting to the database
  mongoose
    .connect(RConnect,{
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 15000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            family: 4 ,// Use IPv4, skip trying IPv6
            connectTimeoutMS: 30000
          })
    .then( async() => {
      console.log("Successfully connected to database" );
     
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

 
    
};