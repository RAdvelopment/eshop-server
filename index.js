const mongoose = require("mongoose");
const app = require("./app");
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");
const url = `mongodb://${IP_SERVER}:${PORT_DB}/${API_VERSION}`;
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexión a la base de datos es satisfactoria");

      app.listen(PORT_DB, () => {
        console.log("#######################################");
        console.log("############ API REST #################");
        console.log("#######################################");
        console.log(`http://${IP_SERVER}:${PORT_DB}/${API_VERSION}`);
      });
    }
  }
);
