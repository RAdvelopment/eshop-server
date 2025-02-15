const express = require("express");
const UserController = require("../controllers/user");

const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/get-users", UserController.getUsers);

module.exports = api;
