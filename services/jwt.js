const jwt = require("jwt-simple");
const moment = require("moment");

const SECRET_KEY =
  "541asd89acj4gj541fglk464gfk1b5ca65a89wqv15aspiraadq84dasd789dqwd4116w3b12fv";

exports.createAccessToken = function (user) {
  const payload = {
    id: user._id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    contact: user.contact,
    createToken: moment().unix(),
    exp: moment().add(6, "hours").unix(),
  };
  return jwt.encode(payload, SECRET_KEY);
};

exports.createRefreshToken = function (user) {
  const payload = {
    id: user._id,
    exp: moment().add(30, "days").unix(),
  };

  return jwt.encode(payload, SECRET_KEY);
};

exports.decodeAccessToken = function (token) {
  return jwt.decode(token, SECRET_KEY, true);
};
