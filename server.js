import express from "express";
import dotenv from "dotenv";
import path from "path";
const __dirname = path.resolve();

import { googleOauth, googleCallback } from "./controllers/auth.controller.js";

const app = express();
const port = 3000;

dotenv.config();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.get("/api/auth/google", googleOauth);
app.get("/auth/google/callback", googleCallback);

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
