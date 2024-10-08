import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
    res.send("Hello from DALL-E");
});

const startServer = async () => {

    try {
        connectDB(process.env.MONGO_URL);
        app.listen(8080, () => {
            console.log("Server has started on https://promptifyart.onrender.com");
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();