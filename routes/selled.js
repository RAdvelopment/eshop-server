const express = require("express");
const SelledController = require("../controllers/selled");

const api = express.Router();

api.post("/post-selled", SelledController.setSelled);
api.get("/get-selled", SelledController.getSelled);

module.exports = api;
