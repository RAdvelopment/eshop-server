const { Schema, model } = require("mongoose");

const SelledSchema = new Schema({
  name: String,
  lastname: String,
  selledDate: {
    type: Date,
    default: Date.now,
  },
  products: Array,
  price: String,
});

module.exports = model("Selled", SelledSchema);
