import User from "../../models/user.js";

export default async function (req, res) {
  let user = await User.findOne({
    _id: req.params.id,
  });
  if (user) {
    res.json(user);
  } else {
    res.json({ success: false, reason: "User Not Found" });
  }
}
