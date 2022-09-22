const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const employeescheema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  interests: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  community: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  events: [
    {
      name: String,
      description: String,
      date: Date,
      speaker: String,
      img: String,
      mode: String,
      community_name: String,
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
employeescheema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, "mmmmmmmmmmmmmmmmmmmmmmm");
    console.log(token, "token");
    // this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};
employeescheema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`the password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(`the password is ${this.password}`);
  }
  next();
});
const Register = new mongoose.model("Register", employeescheema);
module.exports = Register;
