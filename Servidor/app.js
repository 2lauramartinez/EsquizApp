var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send("Esta todo ok?? CON NODEMON!");
});

// // La información se codifica en JSON
app.use("/", express.json({ strict: false, limit:"10MB"})); 

const mysql = require('mysql');
const database = { // configuración de la conexión
host: "localhost", // equipo donde se encuentra la base de datos
user: "root", // usuario de la base de datos
password: "", // contraseña para el usuario
database: "psiquiatra" // nombre de la base de datos
};

var connection = mysql.createConnection(database); // crear la conexión
connection.connect(function (err) { // conectar
if (err) {
    console.error("Error conectando a la base de datos:", err);
    process.exit();
 	}
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});