const { connection } = require("./config/database")
const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
PORT = process.env.PORT || 2026
const cors = require("cors")

app.use(cors({
    // origin: "http://localhost:5173",
    origin: "https://event-pilot-client-theta.vercel.app",
    credentials: true
}))

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
    return res.json({
        success: "true",
        message: "EventPilot server is running successfully."
    })
})

connection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 EventPilot server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to start server due to DB connection error:", err);
    });
