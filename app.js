const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { API_VERSION } = require("./config.js");

//Rutas de usuario

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const selledRoutes = require("./routes/selled");

//Body parser para obtener los datos a través de los api's y pasarlos a json

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Protocolo HTTP y config header

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Router base

app.use(`/eshop`, userRoutes);
app.use(`/eshop`, productRoutes);
app.use(`/eshop`, selledRoutes);

module.exports = app;
