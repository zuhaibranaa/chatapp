import User from "../models/user.js";
import jwt from "jsonwebtoken";

export default function (req, res, next) {
  if (req.headers["x-authorization"]) {
    const decode = jwt.verify(
      req.headers["x-authorization"],
      process.env.APP_KEY
    );
    const { id } = decode;
    User.findOne({ _id: id }).then((data) => {
      if (data) {
        req.auth = { user: data };
        req.socket.on("connection", (socket) => {
          req.connectedSocketClients.push({
            user: data,
            connectionId: socket.client.id,
          });
          socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
          });
        });
        next();
      } else {
        res.status(404).send({
          success: false,
          reason: "User Not Found",
        });
      }
    });
  } else {
    res.status(401).send({
      success: false,
      reason: "unauthorized",
    });
  }
}
