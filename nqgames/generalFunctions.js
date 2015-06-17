/*
 * generalFunctions.js
 * contents functions that will be used in all NQgames
 */
 
 
window.game = 0;
/*
* 1 - nqmines single player
* 2 - nqmines local multiplayer
* 3 - nquares local multiplayer
*/
 
window.player1_name = "Player 1";
window.player2_name = "Player 2";
window.player1_color = "#33BB33";
window.player2_color = "#BB3333";
window.p2Human = true;
window.p1turn = true;
window.turncolor = window.player1_color;
window.rows = 5;
window.cols = 11;
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
	btn.game = window.game;
	
	return btn;
}

///<summary>
///
///</summary>
function btnRepeat(fun) {
	
	var btn = document.createElement("button");
	var innerhtml = "<i class='fa fa-repeat'></i>";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn menuicon";
	btn.id = "btnRepeat";
	btn.name = "btnRepeat";
	btn.addEventListener("click", fun, false);
	btn.game = window.game;
	
	return btn;
}

///<summary>
/// printMenu: create and show the main menu
///</summary>
function printMainMenu() {
	
	clearWorkArea();
	
	var workarea = document.getElementById("workarea");
	
	var p = null; // element p
	var h3 = null; // element h3
	var btn = null; // element button 
	var innerhtml = null; // innerhtml for elements created
	
	//1 player
	p = document.createElement("p");	
	h3 = document.createElement("h3");
	innerhtml = "<i class='fa fa-user'></i> Single Player";
	h3.innerHTML = innerhtml;
	p.appendChild(h3);
	workarea.appendChild(p);
	
	//NQmines 1P
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-flag'></i> NQmines";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btnnqmines1p";
	btn.name = "btnnqmines1p";
	btn.addEventListener("click", setGame, false);
	btn.game = 1;
	p.appendChild(btn);
	workarea.appendChild(p);
	
	//Multiplayer
	p = document.createElement("p");	
	h3 = document.createElement("h3");
	innerhtml = "<i class='fa fa-users'></i> Local MultiPlayer";
	h3.innerHTML = innerhtml;
	p.appendChild(h3);
	workarea.appendChild(p);
	
	//NQmines MP
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-flag'></i> NQmines";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btnnqminesmp";
	btn.name = "btnnqminesmp";
	btn.addEventListener("click", setGame, false);
	btn.game = 2;
	p.appendChild(btn);
	workarea.appendChild(p);
	
	//NQuares MP
	p = document.createElement("p");
	btn = document.createElement("button");
	innerhtml = "<i class='fa fa-crop'></i> NQares";
	btn.innerHTML = innerhtml;
	btn.className = "menubtn";
	btn.id = "btnnquaresmp";
	btn.name = "btnnquaresmp";
	btn.addEventListener("click", setGame, false);
	btn.game = 3;
	p.appendChild(btn);
	workarea.appendChild(p);
		
	//Online MP
	p = document.createElement("p");	
	h3 = document.createElement("h3");
	innerhtml = "<i class='fa fa-globe'></i> Online MultiPlayer";
	h3.innerHTML = innerhtml;
	p.appendChild(h3);
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
}

function setGame(evt){
	window.game = evt.target.game;
	
	switch(window.game) {
		case 1:
			nqmines1P_set();
			break;
		case 2:
			printConfigureMP();
			break;
		case 3:
			printConfigureMP();
			break;
	}
}

function printConfigureMP() {
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
	
	btn.addEventListener("click", configureGame, false);
	
	
	p.appendChild(btn);
	div.appendChild(p);
		
	workarea.appendChild(div);
	
}

function configureGame() {
	
	window.player1_name = document.getElementById("namep1").value;
	window.player2_name = document.getElementById("namep2").value;
	window.player1_color = document.getElementById("colorp1").value;
	window.player2_color = document.getElementById("colorp2").value;
	window.rows = document.getElementById("inputRows").value;
	window.cols = document.getElementById("inputCols").value;
	
	clearWorkArea();
	
	var workarea = document.getElementById("workarea");
	var p = document.createElement("p");
	p.align = "left";
	p.appendChild(btnHome());
	p.appendChild(btnGoSettings(printConfigureMP));
	
	workarea.appendChild(p);	
	workarea.appendChild(divScoreBoard());
	workarea.appendChild(divAlert());
	
	var table = document.createElement("div");
	table.id= "tablero";
	table.className = "tablero";
	workarea.appendChild(table);
	
	switch(window.game) {
		case 2:
			window.tablero = nqminesMP();
			window.tablero.presentaTablero();
			break;
		case 3:
			window.tablero = nqaresMP();
			window.tablero.presentaTablero();
			break;
		default:
			alert("Something wrong happened.");
			break;
	}
	
	randomStart();
}

function divAlert() {
	
	var alert = document.createElement("div");
	alert.id = "divaviso";
	alert.align = "center";
	alert.style.width = "100%";
	
	return alert;
}


function divScoreBoard() {
	
	var scoreboard = document.createElement("div");
	scoreboard.className = "scoreTable";	
	var div = document.createElement("div");
	div.className = "scoreBoard";
	
	var name;
	var points;
	var turno;
	var icon;
	
	//player 1	
	var p1 = document.createElement("div");
	p1.className = "playerScoreBoard";
	p1.style.border = "10px solid " + window.player1_color;
	p1.style.borderLeft = "5px solid " + window.player1_color;
	p1.style.borderRadius = "15px";
	
	icon = document.createElement("div");
	icon.className = "playerIcon";
	icon.style.backgroundColor = window.player1_color;
	icon.style.cssFloat = "left";
	icon.innerHTML = "<i class='fa fa-user'></i>";	
	
	name = document.createElement("div");
	name.className = "playerName";
	name.innerHTML = window.player1_name;
	points = document.createElement("div");
	points.className = "playerPoints";
	points.id = "puntosp1";
	
	p1.appendChild(icon);	
	p1.appendChild(name);
	p1.appendChild(points);
	
	//player 2
	var p2 = document.createElement("div");
	p2.className = "playerScoreBoard";
	p2.style.border = "10px solid " + window.player2_color;
	p2.style.borderRight = "5px solid " + window.player2_color;
	p2.style.borderRadius = "15px";
	
	icon = document.createElement("div");
	icon.className = "playerIcon";
	icon.style.backgroundColor = window.player2_color;
	icon.style.cssFloat = "right";
	icon.innerHTML = "<i class='fa fa-gamepad'></i>";	
	
	name = document.createElement("div");
	name.className = "playerName";
	name.innerHTML = window.player2_name;
	points = document.createElement("div");
	points.className = "playerPoints";
	points.id = "puntosp2";
	
	p2.appendChild(icon);	
	p2.appendChild(name);
	p2.appendChild(points);
	
	//remaining
	var remaining = document.createElement("div");
	remaining.className = "remainingScoreBoard";
	
	var rem = document.createElement("div");
	rem.className = "remainingDiv";
	rem.innerHTML = "Remaining";
	var cell = document.createElement("div");
	cell.className = "playerPoints";
	cell.id="casillasRestantes";
	
	remaining.appendChild(rem);
	remaining.appendChild(cell);
	
	var turns = document.createElement("div");
	turns.className = "turns";
	
	turno = document.createElement("div");
	turno.className = "turn";
	turno.id = "turnop1";
	turno.setAttribute("align", "left");
	turno.innerHTML = '<i class="fa fa-arrow-left"></i>';
	turns.appendChild(turno);
	
	
	turno= document.createElement("div");
	turno.className = "turn";
	turno.id = "turnop2";
	turno.setAttribute("align", "right");
	turno.innerHTML = '<i class="fa fa-arrow-right"></i>';
	turns.appendChild(turno);
	
	remaining.appendChild(turns);
	
	div.appendChild(p1);
	div.appendChild(remaining);
	div.appendChild(p2);
	
	scoreboard.appendChild(div);
	
	return scoreboard;	
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

function nqaresMP() {
	var toret = new TableroNQares(parseInt(window.cols, 10), parseInt(window.rows, 10)); 
	return toret;
}

function nqminesMP() {
	var toret = new TableroNQmines(parseInt(window.cols, 10), parseInt(window.rows, 10)); 
	return toret;
}

function nqmines1P_set() {
	
	clearWorkArea();
	var workarea = document.getElementById("workarea");
	
	var p = document.createElement("p");
	p.align = "left";
	p.appendChild(btnHome());
	p.appendChild(btnRepeat(nqmines1P_set));
	workarea.appendChild(p);
	
	window.tablero = new NQmines1P(6);
	workarea.appendChild(window.tablero.formulario());
	workarea.appendChild(window.tablero.progreso());
	window.tablero.draw();
	window.tablero.inicia();
	//window.tablero.desvelaMinas();
}

