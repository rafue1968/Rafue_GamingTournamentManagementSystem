import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

const app = express();

app.get("/", (req, res) => {
    res.send("Gaming Tournament API running");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:3000`)
})