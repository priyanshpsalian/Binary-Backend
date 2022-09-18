const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("connection to db is successfull");
  })
  .catch((e) => {
    console.log("no connection", e);
  });
