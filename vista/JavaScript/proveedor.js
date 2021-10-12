function clickFilaProveedor(id){	
	inputHidden = buscarTipoInput('Hidden');
	inputHidden = buscarInputPorIdFila(id, inputHidden);
	insertarFilas(inputHidden, id);
	url = document.getElementById('BASE_URL').value;
	url = url + "/vista/procesos/compras/pagos/tablaPagos.php?IDProveedor="+id;
	cargarContenido(url, "tablaPagos");
}

function buscarTipoInput(tipo){
	var inputHidden = new Array();	
	var todosLosInput = document.getElementsByTagName('input');
	
	for(var i = 0; i < todosLosInput.length; i++){
		if(todosLosInput[i].type.toLowerCase() == tipo.toLowerCase()){
			inputHidden.push(todosLosInput[i]);
		}
	}
	
	return inputHidden;
}

function buscarInputPorIdFila(idFila, input){
	var inputFila = new Array();
	var patron = new RegExp(idFila);
	var patronNombre = new RegExp('nombre');
	var patronDireccion = new RegExp('direccion');
	var patronLocalidad = new RegExp('localidad');
	var idInput = '';
	
	for(var i = 0; i < input.length; i++){		
		if(patron.test(input[i].id)){//preguntamos si machea el id de la fila con los id del input hidden
			if(patronNombre.test(input[i].id)){
				idInput = averiguarIndiceFila('e', input[i].id);
				if(parseFloat(idInput) == parseFloat(idFila)){
					inputFila.push(input[i]);
				}
			}
			if(patronDireccion.test(input[i].id)){
				idInput = averiguarIndiceFila('n', input[i].id);
				if(parseFloat(idInput) == parseFloat(idFila)){
					inputFila.push(input[i]);
				}
			}
			if(patronLocalidad.test(input[i].id)){
				idInput = averiguarIndiceFila('d', input[i].id);
				if(parseFloat(idInput) == parseFloat(idFila)){
					inputFila.push(input[i]);
				}
			}
			
		}
	}
	return inputFila;	
}

function insertarFilas(input, id){
	var spanRazonSocial = document.getElementById('razonSocial');
	var spanDireccion = document.getElementById('direccion');
	var spanLocalidad = document.getElementById('localidad');
	var inputIDProveedor = document.getElementById('IDProveedor');
	
	spanRazonSocial.innerText = input[0].value;
	spanDireccion.innerText = input[1].value;
	spanLocalidad.innerText = input[2].value;
	inputIDProveedor.value = id;
}

function buscarProveedor(filtro){
	url = document.getElementById('BASE_URL').value;
	url = url + "/vista/procesos/compras/pagos/busquedaProveedores.php?filtro=" + filtro;
	cargarContenido(url, "tbodyProveedores");
}

function validarTabla(){
	imputar = document.getElementsByName('imputar[]');
	if(imputar.length > 0){
		for(var i = 0; i < imputar.length; i++){
			if(imputar[i].value){
				obtenerSaldo(document.getElementById('montoPagar').value, imputar, -1);
				if(!faltaImputar){
					return true;
				}
				
				else{
					alert('El monto a pagar no coincide con lo imputado');
					return false;
				}
			}
		}
		alert('debe imputar las facturas');
		return false;
	}
	alert('debe seleccionar un proveedor e imputar las facturas');
	return false;
}