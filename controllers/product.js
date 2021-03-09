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
          res.status(404).send({
            code: 404,
            message: "No se han encontrado los productos.",
          });
        } else {
          res.status(200).send({ code: 200, products: productGetted });
        }
      }
    });
}

function deleteProduct(req, res) {
  const { id } = req.params;

  Product.findByIdAndRemove(id, (err, productDeleted) => {
    if (err) {
      res
        .status(500)
        .send({ code: 500, message: "Ha ocurrido un error en el servidor." });
    } else {
      if (!productDeleted) {
        res.status(404).send({
          code: 404,
          message: "No se ha podido borrar el producto con este identificador.",
        });
      } else {
        res.status(200).send({
          code: 200,
          product: productDeleted,
          message: "Producto eliminado exitosamente.",
        });
      }
    }
  });
}

function updateProduct(req, res) {
  const productData = req.body;
  const { id } = req.params;

  Product.findByIdAndUpdate(id, productData, (err, productUpdated) => {
    if (err) {
      res
        .status(500)
        .send({ code: 500, message: "Ha ocurrido un error en el servidor." });
    } else {
      if (!productUpdated) {
        res.status(404).send({
          code: 404,
          message: "No se ha podido actualizar el producto adecuadamente.",
        });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Producto actualizado correctamente." });
      }
    }
  });
}

function getProductId(req, res) {
  const { id } = req.params;

  Product.findById(id, (err, productGetted) => {
    if (err) {
      res
        .status(500)
        .send({ code: 500, message: "Ha ocurrido un error en el servidor." });
    } else {
      if (!productGetted) {
        res.status(404).send({
          code: 404,
          message:
            "No se ha encontrado el producto que está intentando buscar.",
        });
      } else {
        res.status(200).send({ code: 200, productGetted });
      }
    }
  });
}

module.exports = {
  setProducts,
  getProducts,
  deleteProduct,
  updateProduct,
  getProductId,
};
