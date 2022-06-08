const http = require("http");
const axios = require("axios");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const chalk = require("chalk");
const moment = require("moment");

const PORT = 8080;

http
  .createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    if (req.url.includes("/users")) {
      // 4. Por cada consulta realizada al servidor, se debe devolver al cliente una lista con los datos de todos los usuarios registrados usando Lodash para recorrer el arreglo de usuarios.
      _.forEach(users, (user) => {
        res.write(
          `Nombre: ${user.Nombre}<br>Apellido: ${user.Apellido}<br>ID: ${user.Id}<br>Timestamp: ${user.Timestamp}<br><br>`
        );
      });
      _.forEach(users, (u) => {
        // 5. En cada consulta también se debe imprimir por la consola del servidor la misma lista de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk.
        console.log(chalk.bgWhite.blue(JSON.stringify(u)));
      });
    }
    res.end();
  })
  .listen(PORT, () => console.log("Escuchando en el puerto", PORT));

// 1. El registro de los usuarios debe hacerse con la API Random User usando axios para consultar la data.
let users = [];
axios
  .get("https://randomuser.me/api/?results=10")
  .then((data) => {
    data.data.results.forEach((user) => {
      let newUser = {};
      newUser.Nombre = user.name.first;
      newUser.Apellido = user.name.last;
      // 2. Cada usuario registrado debe tener un campo id único generado por el paquete UUID.
      newUser.Id = uuidv4().slice(0, 6);
      // 3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro obtenida por medio del paquete Moment.
      newUser.Timestamp = moment().format("MMMM Do YYYY, hh:mm:ss");
      users.push(newUser);
    });
  })
  .catch((e) => {
    console.log(e);
  });

// 6. El servidor debe ser levantado con el comando Nodemon.
// REVISAR package.json

