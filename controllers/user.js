const Users = require("../models/Users");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function signUp(req, res) {
  const { name, lastname, contact, email, password } = req.body;
  const user = new Users();

  user.name = name;
  user.lastname = lastname;
  user.contact = contact;
  user.email = email.toLowerCase();

  if (!name || !lastname || !email || !password || !contact) {
    res.status(404).send({ message: "Los datos son obligatorios" });
  } else {
    bcrypt.hash(password, null, null, function (err, hash) {
      if (err) {
        res.status(500).send({
          code: 500,
          message: "Ha ocurrido un error encriptando la contraseña.",
        });
      } else {
        user.password = hash;

        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({
              code: 500,
              message: "Este correo ya existe en la base de datos.",
            });
          } else {
            if (!userStored) {
              res.status(404).send({
                code: 404,
                message: "No hay un usuario para guardar, intentelo de nuevo.",
              });
            } else {
              res.status(200).send({
                code: 200,
                message: "Usuario registrado correctamente.",
              });
            }
          }
        });
      }
    });
  }
}

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  Users.findOne({ email }, (err, userStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error en el servidor." });
    } else {
      if (!userStored) {
        res.status(404).send({
          code: 404,
          message:
            "No se ha encontrado el usuario, intente buscando nuevamente.",
        });
      } else {
        bcrypt.compare(password, userStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor" });
          } else if (!check) {
            res.status(404).send({ code: 404, message: "Datos inválidos." });
          } else {
            res.status(200).send({
              code: 200,
              accessToken: jwt.createAccessToken(userStored),
              refreshToken: jwt.createRefreshToken(userStored),
            });
          }
        });
      }
    }
  });
}

function getUsers(req, res) {
  Users.find((err, userGet) => {
    if (err) {
      res
        .status(500)
        .send({ code: 500, message: "Ha ocurrido un error en el servidor" });
    } else {
      if (!userGet) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado los usuarios" });
      } else {
        res.status(200).send({ code: 200, users: userGet });
      }
    }
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
};
