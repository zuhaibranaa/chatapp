import { Router } from "express";
import dotenv from "dotenv";
import register from "./UserHandlers/register.js";
import login from "./UserHandlers/login.js";
import all from "./UserHandlers/all.js";
import single from "./UserHandlers/single.js";
import updateSingle from "./UserHandlers/updateSingle.js";
import deleteSingle from "./UserHandlers/deleteSingle.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
dotenv.config();
const router = Router();

// register new user
router.post("/register", register);
// login a user
router.post("/login", login);
// get all users
router.get("/", admin, all);
// get single user by id
router.get("/:id", auth, single);
// find a user by id and update
router.patch("/:id", auth, updateSingle);
// delete a user
router.delete("/:email", auth, deleteSingle);

export default router;
