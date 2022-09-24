const express = require("express");
const router = express.Router();
require("../../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const community_data = require("../../models/community");
router.use(express.json());
const register_user = require("../../models/register_user");
router.use(cors());
const res = require("express/lib/response");
router.get("/communitysearch/:tags", async (req, res) => {
  try {
    let result = await community_data.find({
      $or: [
        { name: { $regex: req.params.tags } },
        { company: { $regex: req.params.tags } },
        { category: { $regex: req.params.tags } },
      ],
    });
    res.send(result);
    // console.log(`${email} and ${password} and ${useremail._id}`);
  } catch (erroe) {
    res.status(400).send("invalid Email");
  }
});
router.get("/community/:id", async (req, res) => {
	let result = await community_data.find({ _id: `632d517f57d89f7eb74ea4c0` });
  // let result = await community_data.find({ name: { $regex: req.params.id } });
	if (result) {
    console.log(result);
		res.send(result[0]);
	} else {
		res.send("No records found");
	}
});
router.post("/CommunityRegister", async (req, res) => {
	console.log("request");
	try {
		// 		organisationname: "",
		// organiser: "",
		// description: "",
		// tags: "",
		// image: "",
		// datetime: "",
		// location: "",
		// city: "",
		// state: "",
		// country: "",
		console.log(req.body);
		const registerUser = new community_data({
			// user_name: req.body.user_name,
			name: req.body.organisationname,
			organiser: req.body.organiser,
			description: req.body.description,
			tags: req.body.tags,
			date: req.body.datetime,
			// phone: req.body.phone,
			location: req.body.location,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			img: req.body.image,
			// img: req.body.img,
			// likes: req.body.likes,

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
		// await register_user.findOneAndUpdate(
		// 	{
		// 		firstname: `${req.body.user_name}`,
		// 	},
		// 	{
		// 		$addToSet: {
		// 			community: req.body.name,
		// 		},
		// 	}
		// );
		console.log("bef res");
		res.status(201).send(registerUser);
		console.log("after resp");
	} catch (e) {
		res.send("error");
	}
});

// router.post("/CommunityInfo", async (req, res) => {
//   // console.log("request");
//   try {
    
//     console.log(req.body.community);
    

    
//     console.log("bef res");
//     res.status(201).send(registerUser);
//     console.log("after resp");
//   } catch (e) {
//     res.send("error");
//   }
// });
router.post("/CommunityChat/:name", async (req, res) => {
	try {
		await community_data.findOneAndUpdate(
			{
				firstname: `${req.params.name}`,
			},
			{
				$addToSet: {
					chat: req.body,
				},
			}
		);

		res.status(201).send(registerUser);
	} catch (e) {
		res.send("error");
	}
});

module.exports = router;
