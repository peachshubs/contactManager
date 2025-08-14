const mongoose= require("mongoose");
const connectdb=async()=>{
    try{
        // await ... : wait for mongoDB connection to finish
        // process.env.cs: gets DB url from env variables
        // con.con.host: informs which server we're connected to
        // con.con.name: informs which DB we're connected to
        const connect= await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected:",connect.connection.host,connect.connection.name);
    }   
    catch(err){
        console.log(err);
        process.exit(1); // shuts down the entire app
    }
};

module.exports=connectdb;