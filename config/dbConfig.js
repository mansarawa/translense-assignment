import mongoose from "mongoose";
import dotenv from 'dotenv'
async function connectToDb(){
    try {
        dotenv.config();
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectToDb