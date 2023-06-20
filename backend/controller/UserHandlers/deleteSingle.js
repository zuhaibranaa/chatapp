import User from "../../models/user.js";

export default async (req, res) => {
  let user = await User.findOneAndDelete(req.params);
  if (user) {
    res.json({ message: `User ${user.email} deleted Successfully` });
  } else {
    res.json({ message: "Failed to Delete User" });
  }
};
