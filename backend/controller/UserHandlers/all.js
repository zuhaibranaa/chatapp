import User from "../../models/user.js";

export default async function (req, res) {
  let users = await User.find();
  res.json(users);
}
