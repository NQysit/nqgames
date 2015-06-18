/*
 * class Linea
 * represents lines for NQares game
 * @inicio - first coordenate
 * @game - second coordenate
 */
 
function Linea(inicio, fin)
{  
    this.inicio = inicio;
    this.fin = fin;
    this.clicable = true;
    this.visible = true;
    
    var clase ='';
    var orientacion ='';
    if(fin - inicio == 1)
    {
    	orientacion = 'h';
    	clase ='lh';
    }
    else
    {
    	orientacion = 'v';
    	clase = 'lv';
    }
    
    this.clase = clase;
    this.orientacion = orientacion;
    this.id = inicio + '-' + fin;
    
    /*
     * método getID
     * devolve un string coa ID da liña (a modo de 'inicio-fin')
     */
    this.getidentificador = function()
    {
    	return this.identificador;
    };
    
    /*
     * método getClicable
     * devolve boolean de se a liña é clicable
     */
    this.getClicable = function()
    {
    	return this.clicable;
    };
    
     /*
     * función setClicable
     * fixa o valor da propiedade clicable
     */
    this.setClicable = function(valor)
    {
    	this.clicable = valor;
    };
    
    /*
     * función setClicable
     * fixa o valor boolean do atributo clicable
     * @valor true/false
     */
    this.setClicable = function(valor)
    {
    	this.clicable = valor;
    };
    
    /*
     * función setClase
     * aplica á liña a clase/color que lle corresponde
     * @clase clase do css
     */
    this.setClase = function(clase)
    {
    	this.clase=clase;
    };
    
    /*
     * método getClase
     * devolve a clase que ten actualmente a liña
     */
    this.getClase = function()
    {
    	return this.clase;
    };
              
    /*
     * método getRepresentacion
     * devolve un string coa cadena correspondente para debuxar a liña
     */
    this.getRepresentacion = function()
    {
    	var on = " onClick='javascript:tablero.pulsaLinea(this)'";
    	return "<div class='" + this.clase + "' id='" + this.id + "'" + on + "></div>\n";    
    };
        
} //fin claseLinea