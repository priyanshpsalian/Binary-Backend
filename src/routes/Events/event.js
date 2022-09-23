const express = require("express");
const router = express.Router();
require("../../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const event_data = require("../../models/event");
router.use(express.json());
router.use(cors());
const res = require("express/lib/response");
router.get("/event/:name", async (req, res) => {
  let id = await event_data.findOne({ eventname: req.params.name });
  if (id) {
    res.send(id);
  } else {
    res.send("No records found");
  }
});
router.post("/EventRegister", async (req, res) => {
  try {
    const registerUser = new event_data({
      eventname: req.body.name,
      organiser: req.body.organiser_name,
      description: req.body.description,
      date: req.body.date,
      time: req.body.time,
      speaker: req.body.speaker,
      imagepath: req.body.imagepath,
      mode: req.body.mode,
      country: req.body.country,
      city: req.body.city,
      state: req.body.state,
      preference: req.body.preference,
      location: req.body.location,
      tag: req.body.tag,
      likes: req.body.likes,
      totalseats: req.body.totalseats,
      emptyseats: req.body.emptyseats,
      price: req.body.price,
      community: req.body.community,
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
    await register_user.findOneAndUpdate(
      {
        firstname: `${req.body.user_name}`,
      },
      {
        $addToSet: {
          event: req.body,
        },
      }
    );
  } catch (e) {
    res.send("error");
  }
});
// router.get("/event", async (req, resp) => {
//   let products = await add_product.find({ eventname: key });

//   if (products.length > 0) {
//     resp.send(products);
//   } else {
//     resp.send({ result: "No Products found" });
//   }
// });
module.exports = router;
