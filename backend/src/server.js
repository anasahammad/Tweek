import express from "express"
import { ENV } from "./config/env.js"
import cors from "cors"
import { connectDB } from "./config/db.js"
import {clerkMiddleware} from "@clerk/express"
import userRoutes from "./routes/user.route.js"
import postsRoutes from "./routes/post.route.js"
const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())



app.get("/", (req, res) => res.send("Hello from database"))

app.use("/api/users", userRoutes)
app.use("/api/posts", postsRoutes)

// error handling middleWare

app.use((err, req, res)=>{
    console.log("Unhandled error:", err)
    res.status(500).json({error: err.message || "Internal server error"})
})
    

const startServer = async()=>{
    try {
        await connectDB()
        app.listen(ENV.PORT, ()=>console.log("Server is running on port:", ENV.PORT))
    } catch (error) {
        console.error("Failed to start server",error.message)
        process.exit(1)
    }
}

startServer()