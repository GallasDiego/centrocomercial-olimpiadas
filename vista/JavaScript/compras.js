
//Funcion que selecciona el proveedor de la tabla y lo imprime en el formulario
//le paso la variable de ID del proveedor

function seleccionarProveedor(IDProveedor){
	//Creo una variable y guardo en ella el objeto que obtuve a travez del DOM, el objeto es el ID del campo concatenado con el IDProveedor.
	var razonSocial= document.getElementById('razonSocial'+IDProveedor).value;
	var direccion= document.getElementById('direccion'+IDProveedor).value;
	var telefono = document.getElementById('telefono'+IDProveedor).value;
	//Esta linea es para que los campos de la tabla se impriman todos en una sola linea
	//document.getElementById('datosProveedor').innerHTML = razonSocial+', '+direccion+', '+telefono;
	//Obtengo el ID del span correspondiente a cada campo y lo guardo en la variable anteriorment definida
	document.getElementById('datosProveedor').innerHTML= razonSocial;
	document.getElementById('direcProveedor').innerHTML= direccion;
	document.getElementById('telefProveedor').innerHTML= telefono;
	document.getElementById('IDProveedor').value =IDProveedor;
}

//Esta funcion agrega o aumenta la cantidad del articulo imprimiendolo en una segunda tabla
function agregarArticulo(IDArticulo){
	/*
	3) Verificar si existe la fila, en dicho TBODY, correspondiente al articulo seleccionado
		3.a) Si NO existe => Hay que agregar dicha fila. Habría que hacer una funcion aparte agregarFila(IDArticulo)
		3.b) Si SI existe => Aumentar el stock de la misma (en una funcion aparte), y llamar a la funcion calcularTotales():
	*/
	//Obtengo el ID del INPUT de Articulo
	var inputIDArt = document.getElementById('idArt'+IDArticulo);
		//Verifica si NO EXISTE un ID de Articulo
		if(!inputIDArt){
			
			crearFila(IDArticulo);	
		}
		else
		{	//En caso de que ya exista, incrementa la cantidad existente
			aumentarCantidad(IDArticulo);
		}
}

//Esta funcion crea una fila en la Tabla de detalle de la compra
//Recibe el IDArticulo
function crearFila(IDArticulo){

	//--------------------CREAR FILA---------
	//La fila de crea con nodos y se le indica que tipo de elemento debe crear, en este caso un "tr"
	var nodoTr = document.createElement('tr');
	//---------------------------------------
	
	
	//-------------COLUMNA de Articulo--------
	//Una vez creada la fila...
	//CREO CELDA de Articulo
	//Se crea el elemento que le pasamos por parametro
	var nodoArticulo = document.createElement('td');
	//Se obtiene el ID del input oculto en la fila que se selecciono
	var nomArticulo = document.getElementById('nombre'+IDArticulo).value;
	//Un vez que se crea el elemento, se crea un nodo de tipo texto que representa su contenido. Y a este le pasamos por parametro el ID obtenido anteriormente
	var contenido = document.createTextNode(nomArticulo);
	//Se añade al nodo de tipo texto como HIJO del nodo elemento
	nodoArticulo.appendChild(contenido);
	
	//CREAR INPUT
	//Ahora se crean el input y se le asigna las propiedades correspondiente al mismo
	//Se utiliza nuevamente la creacion de un nodo pasandole el elemento a crear
	var nodoInput = document.createElement('input');
	//A ese elemento recientemente creado se le Asigna las propiedades
	nodoInput.id = 'idArt'+IDArticulo;
	nodoInput.name = 'IDsArticulos[]';	
	nodoInput.type = 'hidden';
	nodoInput.value = IDArticulo;
	//Se añade al nodo texto como HIJO del nodo elemento
	nodoArticulo.appendChild(nodoInput);
	//Y al nodo elemento como HIJO DE LA FILA
	nodoTr.appendChild(nodoArticulo);
	
	//-------------COLUMNA de Descripcion--------
	//CREO CELDA de Descripcion
	var nodoDescripcion = document.createElement('td');
	var descripcion = document.getElementById('descripcion'+IDArticulo).value;
	contenido = document.createTextNode(descripcion);
	nodoDescripcion.appendChild(contenido);
	nodoTr.appendChild(nodoDescripcion);
	
	//-------------COLUMNA de Precio Unitario--------
	//CREO CELDA de Precio Unitario
	var nodoPrecioUnitario = document.createElement('td');
	var precioUnitario = document.getElementById('precioVenta'+IDArticulo).value;
	//Asigno al td la clase para que me corra a la derecha el input
	nodoPrecioUnitario.className= 'numero';
	
	
	//CREAR INPUT
	var nodoInput = document.createElement('input');
	nodoInput.id = 'precioVenta'+IDArticulo;
	nodoInput.name = 'preciosUnitarios[]';	
	nodoInput.type = 'text';
	//Se agrega el evento para que ejecute la funcion al momento de perder el foco
	nodoInput.onblur = function(){calcularDetalle();};
	nodoInput.onkeypress = function(){return permitirEscribir(event, 'moneda', this);}
	//Asigno al input la clase para que me corra a la derecha el input
	nodoInput.className = 'numero'; 
	nodoInput.value = precioUnitario;
	
	nodoPrecioUnitario.appendChild(nodoInput);
	nodoTr.appendChild(nodoPrecioUnitario);

	//-------------COLUMNA de Cantidad--------
	//CREO CELDA de Cantidad
	var nodoCantidad = document.createElement('td');
	nodoCantidad.className= 'numero';
	
	
	//CREAR INPUT
	var nodoInputCant = document.createElement('input');
	nodoInputCant.id = 'cantidad'+IDArticulo;
	nodoInputCant.name = 'cantidades[]';	
	nodoInputCant.type = 'texto';
	//Se agrega el evento para que ejecute la funcion al momento de perder el foco
	nodoInputCant.onblur = function(){calcularDetalle();};
	//Se agrega el evento que al precionar la tecla me ejecute la funcion 
	nodoInputCant.onkeypress = function(){return permitirEscribir(event, 'entero', this);}
	nodoInputCant.className = 'numero';
	nodoInputCant.value = '1';
	//el nodo input va a ser hijo del nodo td
	nodoCantidad.appendChild(nodoInputCant);
	nodoTr.appendChild(nodoCantidad);
	
	//-------------COLUMNA de SubTotales--------
	//CREO CELDA de SubTotal
	var nodoSubTotal = document.createElement('td');	
	
	//CREAR SPAN
	var nodoSpan = document.createElement('span');
	nodoSpan.id = 'subTotal'+IDArticulo;
	contenido = document.createTextNode('$ '+precioUnitario);
	nodoSpan.appendChild(contenido);

	//el nodo span va a ser hijo del nodo td
	nodoSubTotal.appendChild(nodoSpan);
	nodoTr.appendChild(nodoSubTotal);
	
	//Ahora se obtiene el ID del tbody a donde se quiere crear la tabla
	var tBody = document.getElementById('detalleCompra');
	//Se añade a la fila como HIJO del tbody
	tBody.appendChild(nodoTr);
	//Le pasamos la funcion que calcula los detalles de los articulos comprados
	calcularDetalle();
}

//Funcion que aumenta la cantidad de los ariculos ya existentes
function aumentarCantidad(IDArticulo){

	var cantidad= document.getElementById('cantidad'+IDArticulo).value;
	//Si la cantidad es mayor a uno, que entre por verdadero
	if(cantidad >=1){
		//Que incremente la cantidad
		document.getElementById('cantidad'+IDArticulo).value++;
		//Una vez que ya tiene la cantidad, le paso la funcion para que calcule el total
		calcularDetalle();
	}	
}
/*	
	//Con firstChil seleccionamos el primer hijo o nodo del elemento
    while (spanSubTotal.firstChild) {
		//Elimina a nodo hijo pasado entre los parametros indicados
        spanSubTotal.removeChild(spanSubTotal.firstChild);
		
    }
	//Sino le asigna al contenidoSpan que sea hijo de spanSubTotal
    spanSubTotal.appendChild(document.createTextNode(contenidoSpan));

}*/

//Funcion que calcula los subtales por cada articulo y total comprado
function calcularDetalle() {

	//Obtengo el ID del cuerpo de la tabla 
	var tBody = document.getElementById('detalleCompra');
	//Obtengo el ID de iva que contiene su valor guardado en la tabla Generico
	var porcentajeIva = document.getElementById('porcentajeIVA').value;
	//isNaN Sirve para comprobar si una variable es un número o no. Si no es un número devuelve true y si lo es devuelve false.
	porcentajeIva = isNaN(porcentajeIva) ? 0 : porcentajeIva;
	var iva = 0;
	var netoGravado = 0;
	var total= 0;
	var subTotal= 0;
	
	//Verifico si hay un tBody
	if(tBody){
	
		var IDArticulo;
		//Obtengo el name del Articulo
		var IDsArticulos = document.getElementsByName('IDsArticulos[]');
		var precioUnitarios = document.getElementsByName('preciosUnitarios[]');
		var precioUnitario;
		var cantidades = document.getElementsByName('cantidades[]');
		var cantidad;
		var contenidoSpan;
		var netoContenido;
		var ivaContenido;
		var totalContenido;
	
		//Recorro todos los precios unitarios que se encuentran en la tabla
		for(var i=0; i < precioUnitarios.length; i++) {
			//A cada precio que va tomando verifica si es un número o no. Si no es un número devuelve true y si lo es devuelve false.
			precioUnitario = isNaN(precioUnitarios[i].value) ? 0 : precioUnitarios[i].value;

			cantidad = isNaN(cantidades[i].value) ? 0 : cantidades[i].value;
		
			//Saco el importe total de cada articulo
			subTotal = precioUnitario * cantidad;
			//Obtengo el ID del articulo que se encuentra en esa posicion y obtengo su valor
			IDArticulo= IDsArticulos[i].value;
			//Funcion toFixed devuelve el numero original de acuerdo con los decimales indicados dentro del parametro
			contenidoSpan = '$ '+subTotal.toFixed(2);
			//la funcion replace, reemplaza el primer argumento('.') por el segundo(',')
			contenidoSpan.replace('.', ','); 
			//obtenemos el ID del subtotal que se encuentra dentro de un span y lo imprime
			document.getElementById('subTotal'+IDArticulo).innerHTML = contenidoSpan;
			
			//Se saca el neto gravado que es la suma acumulada del subTotal obtenido por cada articulo
			netoGravado += subTotal;
			netoContenido = netoGravado.toFixed(2);
			netoContenido.replace('.', ','); 
		}
			
	}
	//Se obtiene el iva multiplicando por la variable que contiene el valor del iva
	iva = (netoGravado * porcentajeIva)/100;
	ivaContenido = iva.toFixed(2);
	ivaContenido.replace('.', ','); 
	
	//Se calcula el total de todos los articulos 
	total = netoGravado + iva;
	totalContenido = total.toFixed(2);
	totalContenido.replace('.', ','); 
	//Y se imprime cada valor pasandole el id correspondiente a cada input
	document.getElementById('netoGravado').value = netoContenido;
	document.getElementById('iva').value = ivaContenido;
	document.getElementById('total').value = totalContenido;

	
}	
//Esta funcion compara si el total ingresado en igual o distinto al calculo que se obtuvo
	function compararFactura(){
	
	var totalFactura = document.getElementById('totalFactura').value;
	var totalDetalle =  document.getElementById('total').value;
	
	if ((totalFactura > 0) && ( totalDetalle > 0) && ( totalDetalle == totalFactura) ){
		
		alert('La compra ha sido actualizada correctamente');
		return true;
	
	}else{
		alert('Los totales no coinsiden. Intente de nuevo');
		return false;

	}
	}

