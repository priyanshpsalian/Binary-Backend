const express = require("express");
const router = express.Router();
require("../../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const register_admin = require("../../models/register_admin");
router.use(express.json());
router.use(cors());
const res = require("express/lib/response");
router.post("/AdminLogin", async (req, res) => {
  try {
    // email1 = req.body.email;
    const email = req.body.email;
    const password = req.body.password;
    let useremail = await register_admin.findOne({ email: email });
    // console.log("ll", useremail.password);
    // console.log(password, useremail.password);
    const isMatch = await bcrypt.compare(password, useremail.password);
    // const id = useremail._id;
    // console.log("l");
    const token = await useremail.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    if (isMatch) {
      useremail = useremail.toObject();
      delete useremail.password;
      delete useremail.confirmpassword;
      res.status(201).send(useremail);
    } else {
      res.send("password not matching");
    }
    // console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (erroe) {
    res.status(400).send("invalid Email");
  }
});

router.post("/AdminRegister", async (req, res) => {
  try {
    const registerUser = new register_admin({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      phone: req.body.phone,
      age: req.body.age,
      email: req.body.email,

      password: req.body.password,
      confirmpassword: req.body.reEnterPassword,
    });

    const token = await registerUser.generateAuthToken();
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 50000),
      httpOnly: true,
    });
    let registered = await registerUser.save();
    registered.toObject();
    delete registered.password;
    delete registered.confirmpassword;

    res.status(201).send(registerUser);
  } catch (e) {
    res.send("error");
  }
});

module.exports = router;
