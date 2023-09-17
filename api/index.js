import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import contactRoute from "./routes/contactRoute.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected");
  } catch (err) {
    console.log("Failed to connect", err);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected");
});

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/contacts", contactRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8800, () => {
  connect();
  console.log(`http://localhost:8800`);
});
