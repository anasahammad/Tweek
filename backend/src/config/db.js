import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async()=>{
    try {
     await mongoose.connect(ENV.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true
     })
     console.log("Connected to Mongodb database ✅")
    } catch (error) {
        console.log("Failed to connect Mongodb database")
        process.exit(1)
    }
}