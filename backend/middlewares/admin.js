import auth from "./auth.js";
export default [
  auth,
  (req, res, next) => {
    if(req.auth.user.isAdmin){
        next();
    }else{
        res.status(405).send({
            success: false,
            reason: "Method Not Allowed",
        })
    }
  },
];
