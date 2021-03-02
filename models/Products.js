const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: String,
  description: String,
  quantity: Number,
  price: Number,
  img: String,
});

module.exports = model("Product", ProductSchema);
