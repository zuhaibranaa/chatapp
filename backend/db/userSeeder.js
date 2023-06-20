import User from "../models/user.js";
import bcrypt from "bcrypt";
export default async function () {
  const hashedPassword = await bcrypt.hash("password", 10);
  const user = await User.create({
    name: "Admin",
    email: "admin@learning.com",
    contactNumber: "123123123",
    isAdmin: true,
    password: hashedPassword,
  });
}
