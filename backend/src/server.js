import express from "express"
import { ENV } from "./config/env.js"
import cors from "cors"
import { connectDB } from "./config/db.js"
import {clerkMiddleware} from "@clerk/express"
import userRoutes from "./routes/user.route.js"
import postsRoutes from "./routes/post.route.js"
import commentRoutes from "./routes/comment.route.js"
import notificationsRoutes from "./routes/notification.route.js"
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js"


const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use(arcjetMiddleware)




app.use("/api/users", userRoutes)
app.use("/api/posts", postsRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/notifications", notificationsRoutes)

// error handling middleWare

app.get("/", (req, res) => res.send("Hello from database"))

app.use((err, req, res, next)=>{
    console.log("Unhandled error:", err)
    res.status(500).json({error: err.message || "Internal server error"})
})
    

const startServer = async()=>{
    try {
        await connectDB()

        // only for local development
        if(ENV.NODE_ENV !== "production"){
            app.listen(ENV.PORT, ()=>console.log("Server is running on port:", ENV.PORT))
        }
    } catch (error) {
        console.error("Failed to start server",error.message)
        process.exit(1)
    }
}

startServer()

// for the vercel deployment
export default app;