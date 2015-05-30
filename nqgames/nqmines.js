/*
 * Autor: Brais Carrión Ansias
 * IAWEB 14/15
 */

//Variables Buscaminas
var iniciado = false;
var finalizado = false;
var dimension = 0;
var minas = 0;
var minasInicio = 0;
var restantes=0;
var iniciais = 0;
var tablaMinas;
var tablaSeleccion;
var tempinicio;


function seleccionaCelda(c)
{
	//se é a primeira pulsación inicializa todas as variables
	if(!iniciado)
		inicia();

	if(!finalizado)
	{
		if(tablaSeleccion[getX(c)][getY(c)] != true && tablaSeleccion[getX(c)][getY(c)] != "marca")
		{

			if(tablaMinas[getX(c)][getY(c)])
			{
				gameover(c);
			}
			else
			{
				var proximas = getProximas(getX(c),getY(c));
				document.getElementById(c).className = "celda alert-info";
				if(proximas > 0)
					document.getElementById(c).innerHTML = '<div class="mostrar">'+proximas+'</div>';

				restantes--;

				//actualiza progreso
				var p = ((iniciais - restantes) / iniciais) * 100;
				p = Math.round(p * 100) / 100

				p = p +"%";
				document.getElementById('progreso').style.width= p;
				document.getElementById('progreso').innerHTML= p;

				if(p == "100%")
				{
					finaliza();
				}
			}

			tablaSeleccion[getX(c)][getY(c)] = true;
		}
	}

	return false;
}

function marcaCelda(c)
{
	//se é a primeira pulsación inicializa todas as variables
	if(!iniciado)
		inicia();

	if(!finalizado)
	{
		var estado = tablaSeleccion[getX(c)][getY(c)];

		//se non está pulsada marca a celda
		if(estado == false)
		{
			document.getElementById(c).className = "celda alert-warning";
			document.getElementById(c).innerHTML = '<div class="mostrar"><span class="glyphicon glyphicon-flag"></span></div>';
			tablaSeleccion[getX(c)][getY(c)] = "marca";
			minas--;
		}

		//se está marcada desmarca a celda
		if(estado == "marca")
		{
			document.getElementById(c).className = "celda";
			document.getElementById(c).innerHTML = '<div class="mostrar">&nbsp;</div>';
			tablaSeleccion[getX(c)][getY(c)] = false;
			minas++;
		}

		//actualizar input minas
		//se o valor é < 0 cambia o estilo para indicar erro
		document.getElementById('inputMinas').value = minas;
		if(minas < 0)
			document.getElementById('inputMinas').className = "form-control error";
		else
			document.getElementById('inputMinas').className = "form-control";
	}

	return false;
}

/*
 * función inicia()
 * inicializa as variables para comezar a partida
 */
function inicia()
{
	iniciado = true;
	dimension = document.getElementById('dimension').value;
	minas = document.getElementById('inputMinas').value;
	minasInicio = minas;

	iniciais =  (dimension * dimension) - minas;
	restantes = iniciais;
	
	tablaMinas = new Array();
	for(i=0; i<dimension;i++)
	{
		tablaMinas[i] = new Array();
		for (j=0;j<dimension;j++)
		{
			tablaMinas[i][j]=false;
		}
	}

	tablaSeleccion = new Array();
	for(i=0; i<dimension;i++)
	{
		tablaSeleccion[i] = new Array();
		for (j=0;j<dimension;j++)
		{
			tablaSeleccion[i][j]=false;
		}
	}

	generaMinas();

	tempinicio = new Date();	
    setInterval(sumaTempo, 1000);
}

function generaMinas()
{
	var cont=0;

	while (cont < minas)
	{
		var x = Math.floor((Math.random() * dimension) + 0);
		var y = Math.floor((Math.random() * dimension) + 0);

		if(!tablaMinas[x][y])
		{
			tablaMinas[x][y]=true;
			cont++;
		}
	}
}

function sumaTempo()
{
	if(!finalizado)
	{
		var t = new Date();
		var dif = (t.getTime() - tempinicio.getTime()) / 1000;
		document.getElementById("inputTempo").value = parseInt(dif);
	}
}

function gameover(c)
{
	finalizado = true;

	//desvela minas
	desvelaMinas();

	//marca a culpable
	document.getElementById(c).className = "celda alert-danger error";


	var div ='';
	div += '<div class="container">';
	div += '<div class="alert alert-danger" role="alert">';
	div += '<label class="control-label">Game Over!</label>';
	div += '</div>';
	div += '</div>';
	document.getElementById("divaviso").innerHTML = div;

}

function finaliza()
{	
	finalizado = true;

	var div ='';
	div += '<div class="container">';
	div += '<div class="alert alert-success" role="alert">';
	div += '<label class="control-label">Noraboa!</label>';
	div += '<br /><br />';
	div += '<button type="submit" name="rexistrascore" id="rexistrascore" class="btn btn-primary btn-sm">Enviar Puntuaci&oacute;n</button>';
	div += '</div>';
	div += '</div>';
	document.getElementById("divaviso").innerHTML = div;

}

function desvelaMinas()
{
	for(var i=0;i<dimension;i++)
		for(var j=0;j<dimension;j++)
		{
			//desvela minas non marcadas
			if(tablaMinas[i][j] && tablaSeleccion[i][j]!="marca")
			{				
				document.getElementById("celda-"+i+"-"+j).className = "celda alert-danger";
				document.getElementById("celda-"+i+"-"+j).innerHTML = '<div class="mostrar"><span class="glyphicon glyphicon-asterisk"></span></div>';
			}

			//desvela marcadas erróneas
			if(!tablaMinas[i][j] && tablaSeleccion[i][j]=="marca")
			{				
				document.getElementById("celda-"+i+"-"+j).className = "celda alert-danger";
			}
		}
}

function getX(c)
{
	var toret = c.split("-")[1];

	return toret;
}

function getY(c)
{
	var toret = c.split("-")[2];
	return toret;
}

function getProximas(x,y)
{
	var toret = 0;

	if(x == 0) //fila superior
	{
		if(y == 0) //se columa esquerda
		{			
			if(tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
		}
		if (y == dimension - 1) //se columna dereita
		{			
			if(tablaMinas[x][y-1]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
		}
		if(y > 0 && y < dimension - 1) //centrais
		{			
			if(tablaMinas[x][y-1]) toret++;
			if(tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
		}
	}
	
	if(x == dimension - 1) //fila inferior
	{
		if(y == 0) //se columa esquerda
		{			
			if(tablaMinas[x-1][y]) toret++;
			if(tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
		}
		if (y == dimension - 1) //se columna dereita
		{			
			if(tablaMinas[x-1][y-1]) toret++;
			if(tablaMinas[x-1][y]) toret++;
			if(tablaMinas[x][y-1]) toret++;
		}
		if(y > 0 && y < dimension - 1) //centrais
		{			
			if(tablaMinas[x-1][y-1]) toret++;
			if(tablaMinas[x-1][y]) toret++;
			if(tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[x][y-1]) toret++;
			if(tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
		}
	}

	if(x>0 && x<dimension - 1) //resto
	{
		if(y == 0) //se columa esquerda
		{			
			if(tablaMinas[x-1][y]) toret++;
			if(tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
		}
		if (y == dimension - 1) //se columna dereita
		{			
			if(tablaMinas[x-1][y-1]) toret++;
			if(tablaMinas[x-1][y]) toret++;
			if(tablaMinas[x][y-1]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
		}
		if(y > 0 && y < dimension - 1) //centrais
		{			
			if(tablaMinas[x-1][y-1]) toret++;
			if(tablaMinas[x-1][y]) toret++;
			if(tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[x][y-1]) toret++;
			if(tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			if(tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;			
		}

	}

	return toret;

}