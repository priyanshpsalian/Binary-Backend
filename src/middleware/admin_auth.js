const jwt = require("jsonwebtoken");
const Register = require("../models/register_admin");

const admin_auth=async(req,res,next)=>{
    try {
      const token = req.cookies.jwt;
      const verifyAdmin = jwt.verify(token, "mmmmmmmmmmmmmmmmmmmmmmm");
      const user = await Register.findOne({ _id: verifyAdmin._id });
      req.token = token;
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send(err);
    }
}
module.exports=admin_auth;