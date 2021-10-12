
	var imputado = 0;//variable global que sirve para refrescar input imputado, tiene el saldo actual
	var faltaImputar = 0;//variable global que sirve para refrescar input faltaImputar, tiene la la plata que falta imputar
	
	function imputarDobleClick(elemento){
		var montoPagar = document.getElementById('montoPagar');//obtenemos el input donde se ingresa el importe
		if(montoPagar.value != ""){
			var tabla = document.getElementById('tablaPagos');//obtenemos la tabla de deudas			
			var imputar = document.getElementsByName('imputar[]');//obtenemos todos lo input donde se imputan las deudas
			obtenerSaldo(montoPagar.value, imputar, elemento.id);
			indiceFila = averiguarFilaElemento(tabla, elemento.id);
			agregarImputado(tabla.rows[indiceFila].cells[3].innerText.formatear('.',','), elemento);
		}		
	}
	
	function obtenerSaldo(monto, imputados, id){//obtenemos el saldo actual. importe menos todo lo que imputamos. recibe como parametro input importe(por el valor del importe) y todos los input imputar(para obtener los valores ya saldados)
		var saldo = 0;		
		for(var i = 0; i < imputados.length; i++){ //ciclo que recorre todos los input imputar
			if(imputados[i].value != "" && imputados[i].id != id){//preguntamos si el saldo esta vacio y si es 							
				saldo += parseFloat(imputados[i].value);//acumulamos los saldo. parseamos a int el valor de los input porque son de tipo string
			}
		}
		imputado = saldo;
		imputado.toFixed(2);
		faltaImputar = parseFloat(monto) - parseFloat(imputado);
		faltaImputar.toFixed(2);
	}
	
	function averiguarFilaElemento(tabla, id){//averiguamos el indice de la fila del elemento para luego obtener la deuda de esa factura. recibimos como parametro la tabla y el id del elemento. el id del elemento se compone de el nombre del input (imputar) mas el numero de la factura (123) ej imputar123. Para saber a que fila pertenece averiguamos los numeros finales del id y lo comparamos con la primera celda de la tabla
		var factura = averiguarIndiceFila('r', id);// todo los id se componen por la palabra imputar + el nro de factura. las funcion nos devuelve el indice del ultimo caracter encontrado en el parametro. en este caso "r". imputa"r"123. al sumar 1 al indice devuelto obtenemos el primer numero de la factura		
		
		for(var i = 0; i < tabla.rows.length; i++){//ciclo que recorre todas las filas de la tabla		
			if(factura == tabla.rows[i].cells[0].innerText){//preguntamos si el nro de factura del elemento coincide con el contenido de la primera celda(factura)			
				return i;//devuelve el indice de la fila asociada al input				
			}
			
		}
	}
	
	function agregarImputado(deuda, elemento){
		if(parseFloat(faltaImputar) >= parseFloat(deuda))
		{			
			//var elementoImputado = document.getElementById('imputado');//obtenemos el elemento input id imputado para refrescarlo			
			//elementoImputado.value = (parseFloat(imputado) + parseFloat(deuda)).toFixed(2);//suma lo que ya teniamos mas lo imputado recientemente pasa por todas las funciones para mostrarlo bien y lo mostramos			
			var elementoFaltaImputar = document.getElementById('faltaImputar');//obtenemos el elemento falta imputar
			elementoFaltaImputar.value = (parseFloat(faltaImputar) - parseFloat(deuda)).toFixed(2);			
			elemento.value = (parseFloat(deuda)).toFixed(2);
		}
		else if(parseFloat(faltaImputar) < parseFloat(deuda) && parseFloat(faltaImputar) != 0)
		{			
			//var elementoImputado = document.getElementById('imputado');//obtenemos el elemento input id imputado para refrescarlo
			//elementoImputado.value = (parseFloat(imputado) + parseFloat(faltaImputar)).toFixed(2);//suma lo que ya teniamos mas lo imputado recientemente pasa por todas las funciones para mostrarlo bien y lo mostramos			
			elemento.value = (parseFloat(faltaImputar)).toFixed(2);
			var elementoFaltaImputar = document.getElementById('faltaImputar');//obtenemos el elemento falta imputar
			var _faltaImputar = (parseFloat(faltaImputar) - parseFloat(elemento.value)).toFixed(2);
			if(_faltaImputar < 0){
				elementoFaltaImputar.value = (0).toFixed(2);
			}
			else if(_faltaImputar == 0 || _faltaImputar > 0){
				elementoFaltaImputar.value = parseFloat(_faltaImputar).toFixed(2);
			}
		}
	}
	
	String.prototype.formatear = function(puntoMil, decimal){//esta funcion recibe un numero y le quita el punto de mil y ademas le cambia la coma por punto		
		var texto = this;
		puntoMil = new RegExp('\\' + puntoMil, 'g');
		texto = texto.replace(puntoMil, '');
		texto = texto.replace(decimal,'.');		
		return texto;
	}

	function eventoOnBlur() {
		var elem = document.getElementById('montoPagar');
		if(elem.value){
			elem.value = parseFloat(elem.value).toFixed(2);
			/*var elementoImputado = document.getElementById('imputado');*/
			var elementoFaltaImputar = document.getElementById('faltaImputar');
			//elementoImputado.value = parseFloat(0).toFixed(2);
			elementoFaltaImputar.value = parseFloat(elem.value).toFixed(2);
		}
		var inputImputar = document.getElementsByName('imputar[]');
		if(inputImputar.length){
			for(var i = 0; i < inputImputar.length; i++){
				inputImputar[i].value="";
			}			
		}
	}
	
	function agregarOnBlur() {
		var elem = document.getElementById('montoPagar');
		if(elem.addEventListener) {
			elem.addEventListener('blur', eventoOnBlur, false);
		}
		else {
			elem.attachEvent('onload', eventoOnBlur);
		}
	}
	
	function borrarDobleClick(elemento){
		var id = averiguarIndiceFila('r', elemento.id);
		imputar = document.getElementById('imputar'+id);
		if(imputar.value){
			imputar.value = "";
			var montoPagar = document.getElementById('montoPagar');
			if(montoPagar.value){
				imputar = document.getElementsByName('imputar[]');
				obtenerSaldo(montoPagar.value, imputar, 'imputar'+id);
				var elementoImputado = document.getElementById('imputado');
				var elementoFaltaImputar = document.getElementById('faltaImputar');
				elementoImputado.value =  imputado.toFixed(2);
				elementoFaltaImputar.value = faltaImputar.toFixed(2);
			}
		}
	}
	
	function averiguarIndiceFila(ultimaLetra, id){
		var id = id.substring(id.lastIndexOf(ultimaLetra) + 1, id.length);//substring nos devuelve un string formado por el indice de inicio y fin que le mandemos. el primero es factura que tiene el indice del primer numero de factura y le indicamos que forme el string desde el primer numero de factura hasta el resto del string. ej imputar123 nos devolvera solo 123(numero de factura)
		return id;
	}
	
	
	if (document.addEventListener) {
		window.addEventListener('load', agregarOnBlur, false);
	}
	else {
		window.attachEvent('onload', agregarOnBlur);
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
