/*
 * class cell for nqmines multiplayer
 */
 
 function Cell2p(name){
	
	this.name = name;
	
	this.getRepresentacion = function()
    {
		var click = " onClick='javascript:tablero.seleccionaCelda(\""+this.name+"\")'";
		var toret = "";
		toret += "<div class='celda' name='"+this.name+"' id='"+this.name+"' ";
		toret += click;
		toret += "><div class='mostrar'>&nbsp</div></div>";
		
		return toret;
    };
}