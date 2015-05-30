/*
 * Clase tablero
 * representa o conxunto de casillas
 * @ancho representa o número de casillas en horizontal
 * @alto representa o número de casillas en vertical
 */

function Tablero(ancho, alto)
{
    this.ancho = ancho; 
    this.alto  = alto;
    
    this.matriz = new Array(); 
    
    this.turno = 'p1';
    this.puntosp1 = 0;
    this.puntosp2 = 0;
    this.restantes = ancho * alto;

	/*
	 * función iniciaArray
	 * crea a estructura do array e cada unha das liñas do taboleiro
	 * 
	 * OJO!!!
	 * 
	 * versión poco eficiente
	 */
	this.iniciaArray = function()
	{
		var max = (this.alto + 1)  * (this.ancho +1);
		
		var toret = new Array(max + 1); 
		
		for(var i=0; i<=max; i++)
		{
			toret[i] = new Array(max + 1);			
		}
		
		for(var i=1; i<=max; i++)
		{
			for(var j=1; j<=max; j++)
			{
				toret[i][j] = new Linea(i,j);
			}
		}		
		return toret;
	}
    
    //inicialización de matriz       
    this.matriz = this.iniciaArray();
    
    /*
     * función presentaTablero
     * escribe o código html correspondente ao taboleiro
     */
    this.presentaTablero = function()
    {
    	var tabla = '';
		var i=0;
		var j=0;
		
		var inicioImpar = 1;
		var inicioPar = 1;
		
		var row = "<div class='row'></div>\n";
		var punto = "<div class='punto'></div>\n";
		var centro = "<div class='cc'></div>\n";
	
		/*
		 *linea impar
		 * 			puntos + horizontales
		 * 			punto final
		 * linea par
		 * 			verticales + centros
		 * 			vertical final 
		 */
	
    	//inicio tabla
    	for(i = 1; i <= this.alto * 2 +1; i++)
		{
			//crear row
			tabla += row;
			
			if(i % 2 == 1) //linea impar
			{
				for (j=1; j<= this.ancho; j++)
				{			
					tabla += punto;
					tabla += this.matriz[inicioImpar][inicioImpar + 1].getRepresentacion();					
					inicioImpar++;
				}
				tabla += punto;
				inicioImpar++;
			}
			else // linea par
			{
				for (j=1; j<= this.ancho; j++)
				{
					tabla += this.matriz[inicioPar][inicioPar + this.ancho +1].getRepresentacion();
					tabla += centro;
					inicioPar++;
				}
				tabla += this.matriz[inicioPar][inicioPar + this.ancho +1].getRepresentacion();
				inicioPar++;
			}
		}
		//fin tabla
	
		document.getElementById('tablero').innerHTML = tabla;
		document.getElementById('casillasRestantes').innerHTML = this.restantes;
		document.getElementById('puntosp1').innerHTML = this.puntosp1;
		document.getElementById('puntosp2').innerHTML = this.puntosp2;
    }
    
    this.generaRandom = function()
    {
    }
    
    //función click
	//invócase ao clickar nunha liña
	this.pulsaLinea = function (id)
	{
		var inicio = id.id.split('-')[0];
		var fin = id.id.split('-')[1];
				
		//alert(inicio + "\n" + fin);
		
		if(this.matriz[inicio][fin].getClicable())
		{
					
			this.marcaLinea(inicio, fin);
			
			//se non se conseguíu un cadrado, cambia o turno
			var cuad = this.compruebaCuadrados(inicio, fin);
			if( cuad == 0)
			{
				this.cambiaTurno();
			}
			else
			{				
				this.sumaPuntos(cuad);
				this.restaRestantes(cuad);
			}
			
			this.matriz[inicio][fin].setClicable(false);
		}
	}
	
	this.marcaLinea = function (inicio, fin)
	{		
		var clase = this.matriz[inicio][fin].getClase() +" " + this.turno;
		this.matriz[inicio][fin].setClase(clase);
		document.getElementById(inicio + '-' + fin).setAttribute("class", clase);
	}
	
	this.cambiaTurno = function()
	{
		if(this.turno == 'p1')
		{
			this.turno= 'p2';
			document.getElementById('turnop2').style.visibility = 'visible';
			document.getElementById('turnop1').style.visibility = 'hidden';
		}
		else
		{
			this.turno = 'p1';
			document.getElementById('turnop1').style.visibility = 'visible';
			document.getElementById('turnop2').style.visibility = 'hidden';
		}		
	}
	
	this.sumaPuntos = function(n)
	{
		if(this.turno == 'p1')
		{
			this.puntosp1 += n;
			document.getElementById('puntosp1').innerHTML = this.puntosp1;
		}
		else
		{
			this.puntosp2 += n;
			document.getElementById('puntosp2').innerHTML = this.puntosp2;
		}
		/*
		var puntos = document.getElementById('puntos' + this.turno).innerHTML;
		document.getElementById('puntos' + this.turno).innerHTML = parseInt(puntos, 10) + n;
		*/
	}
	
	this.restaRestantes = function(n)
	{
		/*
		var puntos = document.getElementById('casillasRestantes').innerHTML;
		document.getElementById('casillasRestantes').innerHTML = parseInt(puntos, 10) - n;
		*/
		
		this.restantes -= n
		document.getElementById('casillasRestantes').innerHTML = this.restantes;
		
		if(this.restantes == 0)
			this.finalizaPartida();
	}
	
	this.finalizaPartida = function()
	{
		var msg = "\nPartida terminada!!\n\n";
		
		if(this.puntosp1 != this.puntosp2)
		{
			msg += "Ganador: ";
			if(this.puntosp1 > this.puntosp2)
				msg += "Player 1\n\n";
			else
				msg += "Player 2\n\n";
		}
		else
			msg+= "EMPATE!!\n\n";
		msg += this.puntosp1 + " - " + this.puntosp2;		
		
		alert(msg);
	}


	this.compruebaCuadrados = function(inicio,fin)
	{
		var toret = 0;
		var cont= 0;

		if(fin - inicio ==1) //horizontal
		{
			cont = 0;
			//casilla superior
			if(inicio > this.ancho) //evitar desborde en matriz por parte superior de tablero
			{
				//arriba
				if (!this.matriz[inicio - this.ancho -1][fin - this.ancho-1].getClicable())
					cont++;
			
				//esquerda
				if (!this.matriz[inicio - this.ancho-1][inicio].getClicable())
					cont++;
								
				//dereita
				if(!this.matriz[fin-this.ancho -1][fin].getClicable())				
					cont++;
			}				
			//comprobación casilla superior
			if(cont == 3)
				toret++;
				
			cont = 0;
			//casilla inferior
			if(fin < (this.ancho +1) * (this.alto) +1) //evitar desborde en matriz por parte inferior de tablero
			{				
				//abaixo
				if (!this.matriz[parseInt(inicio, 10) + parseInt(this.ancho, 10) + parseInt(1, 10)][parseInt(fin, 10) + parseInt(this.ancho, 10) + parseInt(1, 10)].getClicable())
					cont++;
			
				//esquerda
				if (!this.matriz[inicio][parseInt(inicio, 10) + parseInt(this.ancho, 10) + parseInt(1, 10)].getClicable())
					cont++;
			
				//dereita
				if(!this.matriz[fin][parseInt(fin, 10) + parseInt(this.ancho, 10) + parseInt(1, 10)].getClicable())				
					cont++;
			}			
			//comprobación casilla inferior
			if(cont == 3)
				toret++;
		}
		else //vertical
		{			
			cont=0;
			//casilla esquerda
			if((inicio -1) % (this.ancho + 1) > 0)//evitar desborde en matriz por parte esquerda de tablero
			{
				//esquerda
				if(!this.matriz[inicio -1][fin -1].getClicable())				
					cont++;
				//arriba
				if(!this.matriz[inicio -1][inicio].getClicable())				
					cont++;
				//abaixo
				if(!this.matriz[fin -1][fin].getClicable())				
					cont++;
			}							
			//comprobación casilla esquerda
			if(cont == 3)
				toret++;
			
			cont=0;
			//casilla dereita
			if(fin % (this.ancho + 1) != 0)//evitar desborde en matriz por parte dereita de tablero
			{
				//esquerda
				if(!this.matriz[parseInt(inicio, 10) + parseInt(1, 10)][parseInt(fin, 10) + parseInt(1, 10)].getClicable())				
					cont++;
				//arriba
				if(!this.matriz[inicio][parseInt(inicio, 10) + parseInt(1, 10)].getClicable())				
					cont++;
				//abaixo
				if(!this.matriz[fin][parseInt(fin, 10) + parseInt(1, 10)].getClicable())				
					cont++;
			}
			//comprobación casilla dereita
			if(cont == 3)
				toret++;
		}
		
		return toret;
	}
    
            
} 