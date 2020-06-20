var express = require('express');
var app = express();

//La información se codifica en JSON
app.use("/", express.json({ strict: false, limit:"10MB"})); 

const mysql = require('mysql');
const database = { // configuración de la conexión
host: "localhost", // equipo donde se encuentra la base de datos
user: "root", // usuario de la base de datos
password: "", // contraseña para el usuario
database: "psiquiatria" // nombre de la base de datos
};

var connection = mysql.createConnection(database); // crear la conexión
connection.connect(function (err) { // conectar
if (err) {
    console.error("Error conectando a la base de datos:", err);
    process.exit();
 	}
});


app.get('/api/paciente/:id', function (req,res) {
    var sql = "SELECT id_pac, nombre, apellido, sexo, fecha_nac, user, sip, telefono, dni FROM paciente WHERE id_pac = " + req.params.id;
	connection.query(sql, function (err, paciente) {
		if(err) {
			return res.status(500).send("Error en la base de datos")
			}
		else{
			if(!paciente || paciente.length === 0){ 
				return res.status(404).send("No se encuentra paciente")
		}
		};
		res.json(paciente[0]); //devolver solo un objeto (no el array)
    });
    
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});