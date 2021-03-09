const Selled = require("../models/Selled");

function setSelled(req, res) {
  const { name, lastname, selledDate, products, price } = req.body;
  const selled = new Selled();

  selled.name = name;
  selled.lastname = lastname;
  selled.products = products;
  selled.price = price;

  if (selledDate) {
    selled.selledDate = selledDate;
  }

  if (!name || !lastname || !products || !price) {
    res.status(404).send({ code: 404, message: "Los datos son obligatorios" });
  } else {
    selled.save((err, sellSaved) => {
      if (err) {
        res.status(500).send({
          code: 500,
          message:
            "Ha ocurrido un error en el servidor, intentelo de nuevo luego.",
        });
      } else {
        if (!sellSaved) {
          res.status(404).send({
            code: 404,
            message: "No hay ningún producto para guardar",
          });
        } else {
          res.status(200).send({ code: 200, sell: sellSaved });
        }
      }
    });
  }
}

function getSelled(req, res) {
  Selled.find((err, selledGetted) => {
    if (err) {
      res.status(500).send({
        code: 500,
        message: "Error en el servidor obteniendo los datos.",
      });
    } else {
      if (!selledGetted) {
        res.status(404).send({
          code: 404,
          message: "No hay productos vendidos a la fecha.",
        });
      } else {
        res.status(200).send({ code: 200, productsGetted: selledGetted });
      }
    }
  });
}

module.exports = {
  setSelled,
  getSelled,
};
