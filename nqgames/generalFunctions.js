/*
 * generalFunctions.js
 * contents functions that will be used in all NQgames
 */
 
window.player1_name = "Player 1";
window.player2_name = "Player 2";
window.player1_color = "#33BB33";
window.player2_color = "#BB3333";
window.p2Human = true;
window.p1turn = true;
window.turncolor = window.player1_color;
window.rows = 5;
window.cols = 5;
window.tablero = null;

///<summary>
///clearWorkArea: empty the wotk area
///</summary>
function clearWorkArea() {
	document.getElementById("workarea").innerHTML = "";
}

///<summary>
///btnHome: returns a btn with go Home function
///</summary>
function btnHome() {	
	var btn = document.createElement("button");
	var innerhtml = "<i class='fa fa-home'></i>";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn menuicon";
	btn.id = "btnHome";
	btn.name = "btnHome";
	btn.addEventListener("click", printMainMenu, false);
	
	return btn;
}

///<summary>
///btnGoSettings: returns a btn with go settings funcion
///</summary>
function btnGoSettings(fun) {
	
	var btn = document.createElement("button");
	var innerhtml = "<i class='fa fa-cogs'></i>";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn menuicon";
	btn.id = "btnSettings";
	btn.name = "btnSettings";
	btn.addEventListener("click", fun, false);
	
	return btn;
}

///<summary>
/// printMenu: create and show the main menu
///</summary>
function printMainMenu() {
	
	clearWorkArea();
	
	var workarea = document.getElementById("workarea");
	
	var p; // element p
	var h3; // element h3
	var btn; // element button 
	var innerhtml; // innerhtml for elements created
	
	//Local
	p = document.createElement("p");	
	h3 = document.createElement("h3");
	innerhtml = "<i class='fa fa-laptop'></i> Local";
	h3.innerHTML = innerhtml;
	p.appendChild(h3);
	workarea.appendChild(p);
	
	//NQuares
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-crop'></i> NQares";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btn1";
	btn.name = "btn1";
	btn.addEventListener("click", printConfigureNQares, false);
	p.appendChild(btn);
	workarea.appendChild(p);
	
	//NQmines
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-flag'></i> NQmines";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btn1";
	btn.name = "btn1";
	btn.addEventListener("click", asd, false);
	p.appendChild(btn);
	workarea.appendChild(p);
		
	//Online
	p = document.createElement("p");	
	h3 = document.createElement("h3");
	innerhtml = "<i class='fa fa-globe'></i> Online";
	h3.innerHTML = innerhtml;
	p.appendChild(h3);
	workarea.appendChild(p);
	
	//NQuares online
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-crop'></i> NQares";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btn1";
	btn.name = "btn1";
	btn.disabled = true;
	btn.addEventListener("click", null, false);
	p.appendChild(btn);
	workarea.appendChild(p);
	
	//NQmines online
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-flag'></i> NQmines";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btn1";
	btn.name = "btn1";
	btn.disabled = true;
	btn.addEventListener("click", null, false);
	p.appendChild(btn);
	workarea.appendChild(p);
	
	//Settings
	p = document.createElement("p");	
	h3 = document.createElement("h3");
	innerhtml = "<i class='fa fa-cog'></i> Settings";
	h3.innerHTML = innerhtml;
	p.appendChild(h3);
	workarea.appendChild(p);
	 
}

function asd() {
	alert("Asd");
}


function divScoreBoard() {
	
	var scoreboard = document.createElement("div");
	scoreboard.className = "scoreTable";	
	var div = document.createElement("div");
	div.className = "scoreBoard";
	
	var name;
	var points;
	var img;
	var turno;
	
	//player 1	
	var p1 = document.createElement("div");
	p1.className = "playerScoreBoard";
	p1.style.border = "3px solid " + window.player1_color;
	p1.style.borderLeft = "15px solid " + window.player1_color;
	
	name = document.createElement("span");
	name.innerHTML = window.player1_name;
	points = document.createElement("div");
	points.id = "puntosp1";
	turno = document.createElement("div");
	turno.className = "turno";
	turno.id = "turnop1";
	img = document.createElement("img");
	img.src = "images/turno.gif";
	img.height = 10;
	turno.appendChild(img);
	
	p1.appendChild(name);
	p1.appendChild(points);
	p1.appendChild(turno);
	
	//player 2
	var p2 = document.createElement("div");
	p2.className = "playerScoreBoard";
	p2.style.border = "3px solid " + window.player2_color;
	p2.style.borderRight = "15px solid " + window.player2_color;
	
	name = document.createElement("span");
	name.innerHTML = window.player2_name;
	points = document.createElement("div");
	points.id = "puntosp2";
	turno= document.createElement("div");
	turno.className = "turno";
	turno.id = "turnop2";
	img = document.createElement("img");
	img.src = "images/turno.gif";
	img.height = 10;
	turno.appendChild(img);
	
	p2.appendChild(name);
	p2.appendChild(points);
	p2.appendChild(turno);
	
	//remaining
	var remaining = document.createElement("div");
	remaining.className = "remainingScoreBoard";
	
	var rem = document.createElement("div");
	rem.className = "remainingDiv";
	rem.innerHTML = "Remaining";
	var cell = document.createElement("div");
	cell.id="casillasRestantes";
	
	remaining.appendChild(rem);
	remaining.appendChild(cell);
	
	
	
	div.appendChild(p1);
	div.appendChild(remaining);
	div.appendChild(p2);
	
	scoreboard.appendChild(div);
	
	return scoreboard;	
}


function printConfigureNQares() {
	clearWorkArea();
	
	var workarea = document.getElementById("workarea");
	
	var p = document.createElement("p");
	p.align = "left";
	p.appendChild(btnHome());	
	workarea.appendChild(p);
	
	var div = document.createElement("div");
	div.id = "configuraPartida";
	
	var p;
	var spancolor;
	var color;
	var spanname;
	var name;
	var num;
	
	p = document.createElement("p");
	
	spancolor = document.createElement("span");
	spancolor.innerHTML = "Player 1 Color";
	color = document.createElement("input");
	color.type = "color";
	color.value = window.player1_color;
	color.id = "colorp1";
	spanname = document.createElement("span");
	spanname.innerHTML = "Player 1 Name";
	name = document.createElement("input");
	name.type = "text";
	name.value = window.player1_name;
	name.id = "namep1";
	
	p.appendChild(spancolor);
	p.appendChild(color);
	p.appendChild(spanname);
	p.appendChild(name);
	
	spancolor = document.createElement("span");
	spancolor.innerHTML = "Player 2 Color";
	color = document.createElement("input");
	color.type = "color";
	color.value = window.player2_color;
	color.id = "colorp2";
	spanname = document.createElement("span");
	spanname.innerHTML = "Player 2 Name";
	name = document.createElement("input");
	name.type = "text";
	name.value = window.player2_name;
	name.id = "namep2";
	
	p.appendChild(spancolor);
	p.appendChild(color);
	p.appendChild(spanname);
	p.appendChild(name);
	
	div.appendChild(p);
	
	p = document.createElement("p");
	num = document.createElement("input");
	num.type = "number";
	num.value = window.cols;
	num.id = "inputCols";
	p.appendChild(num);
	num = document.createElement("input");
	num.type = "number";
	num.value = window.rows;
	num.id = "inputRows";
	p.appendChild(num);
	
	div.appendChild(p);
	
	p = document.createElement("p");
	
    var btn = document.createElement("button");
	var innerhtml = "<i class='fa fa-play'></i> Play";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn menuicon";
	btn.id = "btnPlay";
	btn.name = "btnPlay";
	btn.addEventListener("click", configureNQuares, false);
	
	
	p.appendChild(btn);
	div.appendChild(p);
		
	workarea.appendChild(div);

}

function configureNQuares() {
			  
	window.player1_name = document.getElementById("namep1").value;
	window.player2_name = document.getElementById("namep2").value;
	window.player1_color = document.getElementById("colorp1").value;
	window.player2_color = document.getElementById("colorp2").value;
	window.rows = document.getElementById("inputRows").value;
	window.cols = document.getElementById("inputCols").value;
	
	printNQares();
}

function printNQares() {
	clearWorkArea();
	
	var workarea = document.getElementById("workarea");
	var p = document.createElement("p");
	p.align = "left";
	p.appendChild(btnHome());
	p.appendChild(btnGoSettings(printConfigureNQares));
	
	workarea.appendChild(p);	
	workarea.appendChild(divScoreBoard());
	
	var table = document.createElement("p");
	table.id= "tablero";	
	workarea.appendChild(table);
	
	tablero = new Tablero(parseInt(window.cols, 10), parseInt(window.rows, 10)); 
	tablero.presentaTablero();
	
	/*
	<div id='partida'>
    			<div class='row'></div>
          		<div id='tablero' class="cell"></div>
          		
          	</div>
         */
        
		/*
        <script>		
		var tablero;
		function creaPartida()
		{
			var ancho = 0;
			var alto = 0;
			ancho = document.getElementById('valorAncho').value;
			alto = document.getElementById('valorAlto').value;
			
			tablero = new Tablero(parseInt(ancho, 10), parseInt(alto, 10)); 
			tablero.presentaTablero();
		}		
    </script>
	*/
	
	
	randomStart();
	
}

function randomStart() {
	if(Math.floor((Math.random() * 10) + 1) % 2 == 0)
		window.p1turn = true;
	else
		window.p1turn = false;
		
	swapTurn();
}


function swapTurn() {
	
	if(window.p1turn)
	{
		window.p1turn = false;
		window.turncolor = window.player2_color;
		document.getElementById('turnop2').style.visibility = 'visible';
		document.getElementById('turnop1').style.visibility = 'hidden';
	}
	else
	{
		window.p1turn = true;
		window.turncolor = window.player1_color;
		document.getElementById('turnop1').style.visibility = 'visible';
		document.getElementById('turnop2').style.visibility = 'hidden';
	}		
}