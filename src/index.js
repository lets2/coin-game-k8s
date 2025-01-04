import express from "express";
import path from "path";
import { config } from "dotenv";

config();

const app = express();

const port = parseInt(process.env.PORT) || 8000;

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
