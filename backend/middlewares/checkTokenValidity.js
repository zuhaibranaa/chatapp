import { tokenBlacklist } from "../controller/user.js";
export default (req, res, next) => {
  let token = req.headers["x-authorization"];
  if (token && tokenBlacklist.has(token)) {
    res.status(401).send({ message: "Token revoked" });
  }
  next();
};
