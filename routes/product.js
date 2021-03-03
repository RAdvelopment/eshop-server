const express = require("express");
const ProductController = require("../controllers/product");

const api = express.Router();

api.post("/post-product", ProductController.setProducts);
api.get("/get-product", ProductController.getProducts);
api.delete("/delete-product/:id", ProductController.deleteProduct);

module.exports = api;
