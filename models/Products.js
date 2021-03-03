const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  title: String,
  description: String,
  quantity: String,
  price: String,
  img: String,
});

module.exports = model("Product", ProductSchema);
