/*
 * class TableroNQmines
 * represents NQmines game
 */
 
function NQmines2p(ancho, alto)
{
    this.ancho = ancho; 
    this.alto  = alto;
	this.minas = parseInt((ancho * alto) / 4);
	
	this.restantes=this.minas;
	this.tablaMinas;
	this.tablaSeleccion;
	this.iniciado = false;
	this.finalizado = false;
    
    this.puntosp1 = 0;
    this.puntosp2 = 0;
	
	this.workarea = document.getElementById("workarea");
    
    /*
     * función presentaTablero
     * escribe o código html correspondente ao taboleiro
     */
    this.presentaTablero = function()
    {
		for(var i=0; i<this.alto;i++) {
			var row = document.createElement("div");
			row.clasName = "fila";
			row.innerHTML="";
			
			for(var j=0; j<this.ancho;j++) {
				var name = "celda-"+i+"-"+j;
				var cell = new Cell2p(name);
				row.innerHTML += cell.getRepresentacion();
			}
			this.workarea.appendChild(row);	
		}
		
		document.getElementById('casillasRestantes').innerHTML = this.restantes;
		document.getElementById('puntosp1').innerHTML = this.puntosp1;
		document.getElementById('puntosp2').innerHTML = this.puntosp2;
    };
	
	this.seleccionaCelda = function(c)
	{
		//se é a primeira pulsación inicializa todas as variables
		if(!this.iniciado)
		{
			this.inicia();
		}
		
		if(!this.finalizado) {
			if(this.tablaSeleccion[this.getX(c)][this.getY(c)] != true)
			{
				if(this.tablaMinas[this.getX(c)][this.getY(c)])
				{
					document.getElementById(c).innerHTML = '<div class="mostrar"><i class="fa fa-flag"></i></div>';
					document.getElementById(c).style.backgroundColor = window.turncolor;
					
					this.restantes--;
					document.getElementById('casillasRestantes').innerHTML = this.restantes;
					
					this.sumaPuntos(1);
					
					if(this.restantes <= 0)
						this.finalizaPartida();
						
				}
				else
				{
					var proximas = this.getProximas(this.getX(c),this.getY(c));
					document.getElementById(c).className = "celda alert-info";
					if(proximas > 0)
						document.getElementById(c).innerHTML = '<div class="mostrar">'+proximas+'</div>';
					
					swapTurn();
				}
	
				this.tablaSeleccion[this.getX(c)][this.getY(c)] = true;
			}
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
	
		this.restantes = this.minas;
		
		this.tablaMinas = new Array();
		for(var i=0; i<this.alto;i++)
		{
			this.tablaMinas[i] = new Array();
			for (var j=0;j<this.ancho;j++)
			{
				this.tablaMinas[i][j]=false;
			}
		}
	
		this.tablaSeleccion = new Array();
		for(var i=0; i<this.alto;i++)
		{
			this.tablaSeleccion[i] = new Array();
			for (var j=0;j<this.ancho;j++)
			{
				this.tablaSeleccion[i][j]=false;
			}
		}
	
		this.generaMinas();
	};
	
	this.generaMinas = function ()
	{
		var cont=0;
	
		while (cont < this.minas)
		{
			var x = Math.floor((Math.random() * this.alto) + 0);
			var y = Math.floor((Math.random() * this.ancho) + 0);
	
			if(!this.tablaMinas[x][y])
			{
				this.tablaMinas[x][y]=true;
				cont++;
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
			if (y == this.ancho - 1) //se columna dereita
			{			
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			}
			if(y > 0 && y < this.ancho - 1) //centrais
			{			
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
		}
		
		if(x == this.alto - 1) //fila inferior
		{
			if(y == 0) //se columa esquerda
			{			
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
			if (y == this.ancho - 1) //se columna dereita
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
			}
			if(y > 0 && y < this.ancho - 1) //centrais
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
		}
	
		if(x>0 && x<this.alto - 1) //resto
		{
			if(y == 0) //se columa esquerda
			{			
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x-1][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[x][parseInt(y, 10) + parseInt(1, 10)]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][parseInt(y, 10) + parseInt(1, 10)]) toret++;
			}
			if (y == this.ancho - 1) //se columna dereita
			{			
				if(this.tablaMinas[x-1][y-1]) toret++;
				if(this.tablaMinas[x-1][y]) toret++;
				if(this.tablaMinas[x][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y-1]) toret++;
				if(this.tablaMinas[parseInt(x, 10) + parseInt(1, 10)][y]) toret++;
			}
			if(y > 0 && y < this.ancho - 1) //centrais
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
	
	this.sumaPuntos = function(n)
	{
		if(window.p1turn)
		{
			this.puntosp1 += n;
			document.getElementById('puntosp1').innerHTML = this.puntosp1;
		}
		else
		{
			this.puntosp2 += n;
			document.getElementById('puntosp2').innerHTML = this.puntosp2;
		}
	};
	
	this.finalizaPartida = function()
	{
		this.finalizado = true;
	
		var div = document.createElement("div");
		div.className = "alert-success";
		
		var msg = "<br />Game Over!<br /><br />";
		
		if(this.puntosp1 != this.puntosp2)
		{
			msg += "Winner: <b>";
			if(this.puntosp1 > this.puntosp2)
				msg += window.player1_name +"</b><br />";
			else
				msg += window.player2_name +"</b><br />";
		}
		else
			msg+= "It is a tie!<br />";
		msg += this.puntosp1 + " - " + this.puntosp2;	
		
		div.innerHTML = msg;	
		document.getElementById("divaviso").appendChild(div);
	};      
} 