const Product = require("../models/Products");

function setProducts(req, res) {
  const { title, description, quantity, price, img } = req.body;

  const product = new Product();

  product.title = title;
  product.description = description;
  product.quantity = quantity;
  product.price = price;
  product.img = img;

  if (!title || !description || !quantity || !price || !img) {
    res.status(500).send({
      code: 500,
      message: "Todos los datos son obligatorios, introduzcalos.",
    });
  } else {
    product.save((err, productStored) => {
      if (err) {
        res
          .status(404)
          .send({ code: 404, message: "Ha ocurrido un error en el servidor." });
      } else {
        if (!productStored) {
          res.status(500).send({
            code: 500,
            message: "No se ha encontrado el producto a guardar.",
          });
        } else {
          res
            .status(200)
            .send({ code: 200, message: "Producto guardado exitosamente." });
        }
      }
    });
  }
}

function getProducts(req, res) {
  Product.find()
    .sort("asc")
    .exec((err, productGetted) => {
      if (err) {
        res
          .status(500)
          .send({ code: 500, message: "Ha ocurrido un error en el servidor." });
      } else {
        if (!productGetted) {
          res
            .status(404)
            .send({
              code: 404,
              message: "No se han encontrado los productos.",
            });
        } else {
          res.status(200).send({ code: 200, products: productGetted });
        }
      }
    });
}

module.exports = {
  setProducts,
  getProducts,
};
