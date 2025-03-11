import mongoose from "mongoose";

 export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://karthikchowdary8635:taec9zSEytDa321O@cluster0.w4odr.mongodb.net/blog-app')
    console.log('DB connected');
    
}