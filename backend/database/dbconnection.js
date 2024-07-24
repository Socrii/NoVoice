import mongoose  from "mongoose";

export const dbConnection=()=>
{
    mongoose
    .connect("process.env.MONGO_URI", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    .then(()=>
    {
        console.log("Database connected");
    })
    .catch((err)=>
    {
        console.log("!!!error in connection with mongodb!!!",err)
    });
}