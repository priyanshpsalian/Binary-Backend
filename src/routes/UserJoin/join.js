const express = require("express");
const router = express.Router();
require("../../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const register_user = require("../../models/register_user");
router.use(express.json());
router.use(cors());
const res = require("express/lib/response");
router.post("/JoinCommunity", async (req, res) => {
  try {
    // email1 = req.body.email;
    const name = req.body.name;
    const community_name = req.body.community_name;
    let username = await register_user.findOne({ firstname: name });
    // console.log("ll", useremail.password);
    // console.log(password, useremail.password);
    // const isMatch = await bcrypt.compare(password, useremail.password);
    // const id = useremail._id;
    // console.log("l");
    
    await register_user.findOneAndUpdate(
      {
        firstname: `${name}`,
      },
      {
        $addToSet: {
          community: req.body.community_name,
        },
      }
    );
    // console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (erroe) {
    res.status(406).send("invalid Email");
  }
});

router.post("/JoinEvent/:name", async (req, res) => {
  try {
    // email1 = req.body.email;
    // const name = req.body.name;
    const name = req.params.name;
    let username = await register_user.findOne({ firstname: name });
    // console.log("ll", useremail.password);
    // console.log(password, useremail.password);
    // const isMatch = await bcrypt.compare(password, useremail.password);
    // const id = useremail._id;
    // console.log("l");

    await register_user.findOneAndUpdate(
      {
        firstname: `${name}`,
      },
      {
        $addToSet: {
          event: req.body,
        },
      }
    );
    // console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (erroe) {
    res.status(406).send("invalid Email");
  }
});

module.exports = router;
