const express = require("express");
const router = express.Router();
require("../../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const community_data = require("./src/models/community");
router.use(express.json());
router.use(cors());
const res = require("express/lib/response");
router.get("/search/:location/:tags/:", async (req, res) => {
  try {
    let result = await search_group.find({
      $or: [
        { name: { $regex: req.params.key } },
        { company: { $regex: req.params.key } },
        { category: { $regex: req.params.key } },
      ],
    });
    res.send(result);
    // console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (erroe) {
    res.status(400).send("invalid Email");
  }
});
router.post("/CommunityRegister", async (req, res) => {
  try {
    const registerUser = new community_data({
      name: req.body.name,
      organiser: req.body.organiser_name,
      tags: req.body.tags,
      date: req.body.date,
      phone: req.body.phone,
      location: req.body.location,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      img: req.body.img,
      img: req.body.img,
      likes: req.body.likes,
      
      // password: req.body.password,
      // confirmpassword: req.body.reEnterPassword,
    });
    

    // const token = await registerUser.generateAuthToken();
    // res.cookie("jwt", token, {
    //   expires: new Date(Date.now() + 50000),
    //   httpOnly: true,
    // });
    let registered = await registerUser.save();
    // registered.toObject();
    // delete registered.password;
    // delete registered.confirmpassword;

    res.status(201).send(registerUser);
  } catch (e) {
    res.send("error");
  }
});


module.exports = router;
