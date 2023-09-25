import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import syncRoutes from "./routes/sync.js";
import catalogRoutes from "./routes/catalog.js";

const app = express();
dotenv.config();

const connect = () => {
    // mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Mongodb connected");
    })
    .catch((err) => {
        throw err;
    });
};

app.use(cors())
app.use(express.json());
app.use("/sync", syncRoutes);
app.use("/shop", catalogRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log("Listening to port 8000");
});