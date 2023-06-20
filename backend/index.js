import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import UserController from "./controller/user.js";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

const connectedSocketClients = [];

// Base Path Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

// Crafting Express App
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(multer().any());
app.use(bodyParser.json());

// Connect to the MongoDB database using Mongoose
mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

// Sockets Stuff Here
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL, // Replace with the actual origin of your frontend application
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
    credentials: true, // Enable CORS credentials (e.g., cookies)
  },
});
// Config Socket Middleware
app.use((req, res, next) => {
  req.socket = io;
  req.socketClients = connectedSocketClients;
  next();
});
// Define your routes here
app.get("/", (req, res) => {
  res.send({
    message: "API Works Fine",
  });
});

// Working With Controllers
app.use("/user", UserController);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(`App is live at http://localhost:${port}`);
});
