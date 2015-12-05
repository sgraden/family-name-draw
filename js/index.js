"use strict";

//Redraw should only be able to be done once. Mark which one was chosen
(function() {
	var request;
	var data;
	window.onload = function() {
		checkIfDrawn();	//See if user has already drawn. Allow again if "got self"

		request = new XMLHttpRequest();
		data = initialDraw();
		document.getElementById("draw_name")
			.addEventListener("click", function(e) {
				drawName(data);
				//Store which name was pulled?
		});
	};

	//Pull data from server on page load
	function initialDraw() {
		request.onreadystatechange = function() {
			if (request.readyState === XMLHttpRequest.DONE) {
				//good stuff
				if (request.status === 200) {
				    data = JSON.parse(request.responseText);
				    console.log(data);
				} else {
					console.log(request.status, request.responseText);
				    // there was a problem with the request,
				    // for example the response may contain a 404 (Not Found)
				    // or 500 (Internal Server Error) response code
				}
			} else {
				//not done
			}
		};
		request.open('GET', 'req.php', true);
		request.send("action=getNames");	
	}

	function drawName(data) {
		var output = document.getElementById("name_output");
		var name = output.innerHTML;
		while (name == output.innerHTML) { //Guarantees new name
			name = data[Math.floor(Math.random() * data.length)].name;
		}
		output.innerHTML = name;

		setCookie("hasDrawn", 1, 7);
	}
	
	function checkIfDrawn() {
		var drawn = parseInt(getCookie("hasDrawn"));
		if (drawn == 1) {
			//disable things and output message
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


})();