"use strict";

//Redraw should only be able to be done once. Mark which one was chosen
//Then prevent further clicks except when thye have gotten their own name.
(function() {
    
var socket = io();

//Server information
var request;
var data = [];
var chosen;
//var drawn = 0; //Have they drawn?

//Canvas drawing tools
var canvas;
var ctx;
var bubbleTimer;
var bubbles = [];
var then;

window.onload = function() {
	checkIfDrawn();	//See if user has already drawn. Allow again if "got self"

	request = new XMLHttpRequest();
	httpRequest('get_names', setData); //Lazy and tell to check every 5 sec?
	document.getElementById("draw_name").addEventListener("click", function(e) {
		if (data.length > 0) { //There is data
			drawName(data); //rotate box?
		} else { 
			//No data or all names chosen
			document.getElementById("name_output").innerHTML = 
				"<span class='place_holder'>Oh No! All names chosen</span>";
		}
	});

	// letters = document.getElementById("title").innerHTML;
	// christmasLights();
	window.addEventListener('resize', resizeCanvas, false); //Resize canvas
	makeCanvas();	
	bubbleTimer = setInterval(generateBubbles, 50);

	var then = Date.now();
	main();
};

//Pull data from server on page load
function httpRequest(url, callback) {
	request.onreadystatechange = function() {
		if (request.readyState === XMLHttpRequest.DONE) { //should be 4
			//good stuff
			if (request.status === 200) {
				if (typeof(callback) == "function") {
					console.log(JSON.parse(request.responseText));
					callback(JSON.parse(request.responseText));	
				}
			} else {
				console.log("req status: " + request.status, request.responseText);
			    // there was a problem with the request,
			    // for example the response may contain a 404 (Not Found)
			    // or 500 (Internal Server Error) response code
			}
		} else {
			//not done
			console.log("not done", request.readyState);
		}
	};
	request.open('GET', url, true);
	request.send(null);
}

//Set global variable Data at the initial call
function setData(d) {
	data = d;
}

function drawName() {
	var output = document.getElementById("name_output");
	var tmp = chosen;
	while (chosen == tmp) { //Guarantees new name
		chosen = data[Math.floor(Math.random() * data.length)];
	}
	output.innerHTML = chosen.name;
	setCookie("hasDrawn", 1, 7);
	//httpRequest("req.php?action=updateName&uid=" + chosen.id);
}

//Sets text at load to prevent redrawing
function checkIfDrawn() {
	var drawn = parseInt(getCookie("hasDrawn"));
	console.log(drawn);
	if (drawn == 1) { //Should work even when not set
		document.getElementById("draw_name").disabled = true;
		document.getElementById("name_output").innerHTML = 
				"<span class='place_holder'>you have already chosen!</span>";
	}
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function makeCanvas() {
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	var container = document.getElementById("canvas-container");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	container.appendChild(canvas);
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function generateBubbles() {
    bubbles.push(
        new Bubble( //x,y,rad,speed
            Math.random() * window.innerWidth, 
            -30,
            Math.random() * 5 + 1,
            Math.random() * 30 + 30
        )
    );
}

function update (modifier) {
    for (var i = 0; i < bubbles.length; i++) {
        var bub = bubbles[i];

        bub.step++;
        bub.y += bub.speed * modifier; //move down
        if (bub.y >= canvas.height) { //if out of screen
            bubbles.splice(i, 1);
            i--;
        }  
    }
};

function render () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //fill blue half
    ctx.fillStyle = "rgb(30, 144, 255)";
    ctx.fillRect(0,0,canvas.width,canvas.height * .65);
    //fill white half
    ctx.fillStyle = "rgb(252, 252, 255)";
    ctx.fillRect(0, canvas.height * .65, canvas.width, canvas.height * .35);

    //RENDER BUBBLES
    for (var i = 0; i < bubbles.length; i++) {
        var bub =  bubbles[i];
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.arc(bub.x, bub.y, bub.rad, 0, Math.PI * 2);
        ctx.fill();
    }  
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;   
function main () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000); //modifier
    render();

    then = now;

    //Request to do this again ASAP
    requestAnimationFrame(main);
};

var Bubble = function(x, y, rad, speed) {
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.speed = speed;
    this.step = 0;
};

//Attempt to make festivities
//var letters = [];
//var xmasColors = ["#016A3B", "#F8C82E", "#6180BD", "#EA2738", "#EF5B21"];

// function christmasLights() {
// 	console.log(letters);
// 	for (var i = 0; i < letters.split().length; i++) {
// 		letters[i].style.color = xmasColors[Math.floor(Math.random() * 5)];
// 	}
// }

})();