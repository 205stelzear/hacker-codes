var c = document.querySelector("canvas");
var ctx = c.getContext("2d");

var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
charset = charset.split("");

var font_size = 18;

var numberOfColumns = 0;

// an array of drops - one per column
var drops = [];

var windowMiddle = 0;

function resetSize(){
	
	// making the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;
	numberOfColumns = Math.round(c.width / font_size); //number of columns for the rain
	windowMiddle = Math.round(c.height / 2);
	
	// x below is the x coordinate
	// 0 = y coordinate of the drop
	for(var x = drops.length; x < numberOfColumns; x++){
		drops[x] = Math.round(Math.random() * -100);
	}
	
	if(drops.length != 0 && drops.length > numberOfColumns){
		drops.length -= drops.length - numberOfColumns;
	}
	
}

resetSize();

window.addEventListener("resize", resetSize);

var string = undefined;

var padding = 2;

// drawing the characters
function draw(){
	
	// Black BG for the canvas
	// translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = "#0F0"; //green text
	ctx.font = font_size + "px monospace";
	
	var dropsMiddle = (drops.length % 2 == 0 ? drops.length : drops.length - 1) / 2;
	
	//looping over drops
	for(var i = 0; i < drops.length; i++){
		
		// a random character to print
		var text = charset[Math.floor(Math.random() * charset.length)];
		
		if(string != undefined){
			var stringMiddle = (string.length % 2 == 0 ? string.length : string.length + 1) / 2;
			
			var lowerMiddle = (dropsMiddle - stringMiddle);
			var upperMiddle = (dropsMiddle + stringMiddle);
		}
		
		if(string != undefined && i > lowerMiddle - padding && i <= upperMiddle + padding && drops[i] == Math.round(windowMiddle / font_size)){
			
			if(i > lowerMiddle && i <= upperMiddle){
				ctx.fillText(string.charAt(i - dropsMiddle + stringMiddle - 1), i * font_size, drops[i] * font_size);
			}
			
		}
		else{
			
			ctx.fillText(text, i * font_size, drops[i] * font_size);
			
			var shouldRandom = stringMiddle != undefined && i > lowerMiddle && i <= upperMiddle
			
			// sending the drop back to the top randomly after it has crossed the screen
			// adding a randomness to the reset to make the drops scattered on the Y axis
			if(drops[i] * font_size > c.height && (shouldRandom || Math.random() > 0.975)){
				drops[i] = Math.round(Math.random() * -15);
			}
			
			// incrementing Y coordinate
			drops[i]++;
			
		}
		
	}
	
}

var interval = setInterval(draw, 50);

function codeInput(e){
	
	if(event.key === "Enter"){
		
		var inputText = e.value;
		
		if(inputText != ""){
			
			e.value = "";
			
			string = inputText;
			
			document.querySelector("div#input").style.display = "none";
			
		}
		
	}
	
}

window.addEventListener("keypress", (e) => {
	
	if(e.srcElement.nodeName.toLowerCase() != "input" && e.key === "Enter"){
		
		document.querySelector("div#input").style.display = "";
		document.querySelector("div#input>input").focus();
		
	}
	else if(string != undefined && e.key !== "Enter"){
		string = undefined;
	}
	
});
