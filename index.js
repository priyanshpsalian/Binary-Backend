const express = require("express");
const app = express();
const port = 5000;


const cors = require("cors");
const User=require("./src/routes/UserSignUpAndRegister/User");
const Admin=require("./src/routes/AdminSignUpAndRegister/Admin");
const Community = require("./src/routes/Community/community_data");
const Event = require("./src/routes/Events/event");
const join = require("./src/routes/UserJoin/join");
app.use(express.json());
app.use(cors());

app.use("/user",User);
app.use("/community", Community);
app.use("/admin",Admin);
app.use("/event", Event);
app.use("/join", join);
app.get("/", (req, res) => {
  res.send("kk");
});



app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
