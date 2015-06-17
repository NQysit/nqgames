function cell1p(name){
	
	this.name = name;
	
	this.getRepresentacion = function()
    {
		var click = " onClick='javascript:tablero.seleccionaCelda(\""+this.name+"\")'";
		var context = " oncontextmenu='javascript:tablero.marcaCelda(\""+this.name+"\");return false'";
		var toret = "";
		toret += "<div class='celda' name='"+this.name+"' id='"+this.name+"' ";
		toret += click;
		toret += context;
		toret += "><div class='mostrar'>&nbsp</div></div>";
		
		return toret;
    }
	
}