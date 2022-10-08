const express= require("express");
const bodyparser= require("body-parser");
const cors = require('cors');
var app = express();
var mysql = require('mysql');

app.use(cors());
app.use(express.json());
// app.use(express.static("./static"))

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	port: '3306',
	password: '',
	database: 'kian_task'
});

connection.connect(function (error) {
	if (!!error) {
		console.log(error);
	} else {
		console.log('Database Connected Successfully');
	}
});


//Define Routes
app.use('/', require('./routes/pages'));


app.listen(4000, () => {
	console.log("Server started on Port 4000");
})