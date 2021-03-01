const { Schema, model } = require("mongoose");

const User = new Schema({
  name: String,
  lastname: String,
  contact: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

module.exports = model("User", User);
