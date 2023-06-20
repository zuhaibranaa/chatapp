import User from "../../models/user.js";

export default async (req, res) => {
  let user = await User.find(req.params.id);
  user = req.body;
  user.save();
  res.json(user);
};
