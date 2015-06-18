/*
 * class NQmines1P
 * represents NQmines single player game
 */
 
function NQmines1P(size) {
	
	//Variables Buscaminas
	this.iniciado = false;
	window.finalizado = false;
	this.dimension = size;
	this.minas = parseInt((size * size) / 4);
	this.minasInicio = 0;
	this.restantes=0;
	this.iniciais = 0;
	this.tablaMinas;
	this.tablaSeleccion;
	window.tempinicio;
	this.workarea = document.getElementById("workarea");
	
	this.draw = function() {
		
		for(var i=0; i<this.dimension;i++) {
			var row = document.createElement("div");
			row.clasName = "fila";
			row.innerHTML="";
			
			for(var j=0; j<this.dimension;j++) {
				var name = "celda-"+i+"-"+j;
				var cell = new Cell1p(name);
				row.innerHTML += cell.getRepresentacion();
			}
			this.workarea.appendChild(row);	
		}
		
	};

	this.seleccionaCelda = function(c)
	{
		//se é a primeira pulsación inicializa todas as variables
		if(!this.iniciado)
		{
			this.inicia();
		}
	
		if(!window.finalizado)
		{
			if(this.tablaSeleccion[this.getX(c)][this.getY(c)] != true && this.tablaSeleccion[this.getX(c)][this.getY(c)] != "marca")
			{
				if(this.tablaMinas[this.getX(c)][this.getY(c)])
				{
					this.gameover(c);
				}
				else
				{
					var proximas = this.getProximas(this.getX(c),this.getY(c));
					document.getElementById(c).className = "celda alert-info";
					if(proximas > 0)
						document.getElementById(c).innerHTML = '<div class="mostrar">'+proximas+'</div>';
	
					this.restantes--;
	
					//actualiza progreso
					var p = ((this.iniciais - this.restantes) / this.iniciais) * 100;
					p = Math.round(p * 100) / 100;
	
					p = p +"%";
					document.getElementById('progreso').style.width= p;
					document.getElementById('progreso').innerHTML= p;
	
					if(p == "100%")
					{
						this.finaliza();
					}
				}
	
				this.tablaSeleccion[this.getX(c)][this.getY(c)] = true;
			}
		}
	
		return false;
	};
	
	this.marcaCelda = function (c)
	{
		//se é a primeira pulsación inicializa todas as variables
		if(!this.iniciado)
		{
			this.inicia();
		}
	
		if(!window.finalizado)
		{
			var estado = this.tablaSeleccion[this.getX(c)][this.getY(c)];
	
			//se non está pulsada marca a celda
			if(estado == false)
			{
				document.getElementById(c).className = "celda alert-warning";
				document.getElementById(c).innerHTML = '<div class="mostrar"><i class="fa fa-flag"></i></div>';
				this.tablaSeleccion[this.getX(c)][this.getY(c)] = "marca";
				this.minas--;
			}
	
			//se está marcada desmarca a celda
			if(estado == "marca")
			{
				document.getElementById(c).className = "celda";
				document.getElementById(c).innerHTML = '<div class="mostrar">&nbsp;</div>';
				this.tablaSeleccion[this.getX(c)][this.getY(c)] = false;
				this.minas++;
			}
	
			//actualizar input minas
			//se o valor é < 0 cambia o estilo para indicar erro
			document.getElementById('inputMinas').value = this.minas;
			if(this.minas < 0)
				document.getElementById('inputMinas').className = "error";
			else
				document.getElementById('inputMinas').className = "";
		}
	
		return false;
	};
	
	/*
	 * función inicia()
	 * inicializa as variables para comezar a partida
	 */
	this.inicia = function()
	{
		this.iniciado = true;
		this.minasInicio = this.minas;
	
		this.iniciais =  (this.dimension * this.dimension) - this.minas;
		this.restantes = this.iniciais;
		
		this.tablaMinas = new Array();
		for(var i=0; i<this.dimension;i++)
		{
			this.tablaMinas[i] = new Array();
			for (var j=0;j<this.dimension;j++)
			{
				this.tablaMinas[i][j]=false;
			}
		}
	
		this.tablaSeleccion = new Array();
		for(var i=0; i<this.dimension;i++)
		{
			this.tablaSeleccion[i] = new Array();
			for (var j=0;j<this.dimension;j++)
			{
				this.tablaSeleccion[i][j]=false;
			}
		}
	
		this.generaMinas();
	
		window.tempinicio = new Date();	
	    setInterval(this.sumaTempo, 1000);
	};
	
	this.generaMinas = function ()
	{
		var cont=0;
	
		while (cont < this.minas)
		{
			var x = Math.floor((Math.random() * this.dimension) + 0);
			var y = Math.floor((Math.random() * this.dimension) + 0);
	
			if(!this.tablaMinas[x][y])
			{
				this.tablaMinas[x][y]=true;
				cont++;
			}
		}
	};
	
	this.sumaTempo=function()
	{
		if(!window.finalizado)
		{
			var t = new Date();
			var dif = (t.getTime() - window.tempinicio.getTime()) / 1000;
			document.getElementById("inputTempo").value = parseInt(dif);
		}
	};
	
	this.gameover=function(c)
	{
		window.finalizado = true;
	
		//desvela minas
		this.desvelaMinas();
	
		//marca a culpable
		document.getElementById(c).className = "celda error";
	
		var div ='';
		div += '<div class="alert-danger">';
		div += 'Game Over!';
		div += '</div>';
		document.getElementById("divaviso").innerHTML = div;
	
	};
	
	this.finaliza=function()
	{	
		window.finalizado = true;
	
		var div ='';
		div += '<div class="alert-success">';
		div += 'You win!';
		div += '</div>';
		document.getElementById("divaviso").innerHTML = div;
	
	};
	
	this.desvelaMinas=function()
	{
		for(var i=0;i<this.dimension;i++)
			for(var j=0;j<this.dimension;j++)
			{
				//desvela minas non marcadas
				if(this.tablaMinas[i][j] && this.tablaSeleccion[i][j]!="marca")
				{				
					document.getElementById("celda-"+i+"-"+j).className = "celda alert-danger";
					document.getElementById("celda-"+i+"-"+j).innerHTML = '<div class="mostrar"><i class="fa fa-asterisk"></i></span></div>';
				}
	
				//desvela marcadas erróneas
				if(!this.tablaMinas[i][j] && this.tablaSeleccion[i][j]=="marca")
				{				
					document.getElementById("celda-"+i+"-"+j).className = "celda alert-danger";
				}
			}
	};
	
	this.getX=function(c)
	{
		var toret = c.split("-")[1];
	
		return toret;
	};
	
	this.getY=function(c)
	{
		var toret = c.split("-")[2];
		return toret;
	};
	
	this.getProximas=function(x,y)
	{
		var toret = 0;
	
		if(x == 0) //fila superior
		{
			if(y == 0) //se columa esquerda
			{			
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
			if (y == this.dimension - 1) //se columna dereita
			{			
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			}
			if(y > 0 && y < this.dimension - 1) //centrais
			{			
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
		}
		
		if(x == this.dimension - 1) //fila inferior
		{
			if(y == 0) //se columa esquerda
			{			
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
			if (y == this.dimension - 1) //se columna dereita
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
			}
			if(y > 0 && y < this.dimension - 1) //centrais
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
		}
	
		if(x>0 && x<this.dimension - 1) //resto
		{
			if(y == 0) //se columa esquerda
			{			
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
			if (y == this.dimension - 1) //se columna dereita
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			}
			if(y > 0 && y < this.dimension - 1) //centrais
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;			
			}
	
		}
	
		return toret;
	
	};
	
	this.formulario=function() {
		var toret ='';                  
	    toret += '<i class="fa fa-clock-o"></i>';
	    toret += '<input type="text" id="inputTempo" name="inputTempo" value=0 readonly>';
	    toret += '<i class="fa fa-asterisk"></i>';
	    toret += '<input type="text" id="inputMinas" name="inputMinas" value="'+this.minas+'" readonly>';
		toret += '<br /><br/>';
	    toret += '<div align="center" name="divaviso" id="divaviso"></div>';
		toret += '<br />';
		
		var div = document.createElement("div");
		div.innerHTML = toret;
		return div;
	};
	   
	this.progreso=function() {
		var toret ='';
		
	   	toret += '	<div class="meter">';
		// toret += '		<div class="progress-bar" name="progreso" id="progreso" role="progressbar" aria-valuenow="26" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em; width:0%">';
		// toret += '			0%';
		// toret += '		</div>';
		toret += '<span id="progreso" style="width: 0%">0%</span>';
		toret += '	</div>';
		toret += "<br />";
		
		var div = document.createElement("div");
		div.innerHTML = toret;
		return div;
	};
}