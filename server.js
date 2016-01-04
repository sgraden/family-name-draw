/* global __dirname */
var express = require("express");
var app = express();
var path = require("path"); //Used to deliver html files

var mysql = require("mysql"); //Connect to mysql
var hbs = require("hbs"); //Render handlebars

//Socket stuff
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Create a mysql connection to localhost (dev only)
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "fam"
});

//App configurations
app.use('/public', express.static(__dirname + '/public')); //Configure the root of the folder
app.set("view engine", "html");
//app.set("port", 8008);
app.engine("html", hbs.__express); //set view engine to handlebars

//Root directory deliver html
//Should check if user has already drawn and set text appropriately instead of doing on front end
app.get("/", function (req, res) { 
	res.sendFile(path.join(__dirname, "public", "views", "index.html")); //Send back html file
});

//Get the list of unchosen names from db
app.get("/get_names", function (req, res) {
    console.log("getting names...");
    conn.query("SELECT * FROM people WHERE isPicked <> 1", function (err, rows, fields) {
        if (err) { //if error, break
            throw err;
            return;  
        } 
        res.send(JSON.stringify(rows));
    })
    
});

//May leave out updating name for the time being. 
//update name "UPDATE people SET isPicked = 1 WHERE id = " . $_GET["uid"]

//Example route
app.get("/Hi", function (req, res) {
	res.render("index", {name:"bob", greeting:"jonathan"}); //Handlebars stuff
});

app.listen(8008, function () {
	console.info('Server listening on port ');
});

//Socket listeners
io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});