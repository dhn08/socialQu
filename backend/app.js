import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env" });
}

//Using middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());

//Importin routes
import post from "./routes/post.js";
import user from "./routes/user.js";

//Using routes
app.use("/api/v1", post);
app.use("/api/v1", user);
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
export default app;
