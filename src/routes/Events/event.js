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
router.get("/event", async (req, res) => {
	let id = await event_data.find();
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
			date: req.body.date,
			time: req.body.time,
			speaker: req.body.speaker,
			organiser: req.body.organiser,
			imagepath: req.body.image,
			mode: req.body.mode,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			location: req.body.location,
			tag: req.body.tags,
			preference: req.body.preference,
			description: req.body.description,
			totalseats: req.body.numofseats,
			likes: req.body.likes,
			emptyseats: req.body.numofseatsleft,
			price: req.body.cost,
			community: req.body.communityname,
		});

		console.log(req.body);

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
		await event_data.findOneAndUpdate(
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
