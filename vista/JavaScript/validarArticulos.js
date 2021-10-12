function validarPrecioArticulo () {

	var elmentPVenta1 = document.getElementById('precioVenta1').value;
	var elmentPVenta2 = document.getElementById('precioVenta2').value;
	var elmentPCosto = document.getElementById('precioCosto').value;

	var precioCosto = parseFloat(elmentPCosto);
	var precioVenta1 = parseFloat(elmentPVenta1);
	var precioVenta2 = parseFloat(elmentPVenta2);

	if (precioCosto<=precioVenta1 && precioCosto<=precioVenta2) {
		if (precioVenta1>=precioCosto && precioVenta1>=precioVenta2) {
			return true;
		}
		else{
			return confirm('P. Unitario(Menor) menor P. Unitario(Mayor). ¿Quiere guardar el artículo?');
		}
	}
	else{
		
		return confirm('P.Unitario (Menor) o (Mayor) menores al Precio Costo. ¿Quiere guardar el artículo?');
	}
}