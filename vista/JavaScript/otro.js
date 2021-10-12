addEvent(window,'load',detectarForm,false);
forms = new Array("formGastos","formComisiones");//Array con los id de todos los formularios
var formulario = "";

function nuevoAjax(){
  var xmlhttp=false;
    try{
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e){
    try{
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
    }

  if(!xmlhttp && typeof XMLHttpRequest!='undefined'){
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function detectarForm(){
  for(i=0; i<forms.length; i++){//Recorro el array de ids
    if(document.getElementById(forms[i])){
      /*Se obtiene true si el valor donde se encuentra situado el puntero del array
        coincide con el id del formulario que llamo al archivo javaScript*/
      formulario=document.getElementById(forms[i]);//Variable donde se captura el formulario
      addEvent(formulario,'submit',enviarDatos,false);
      i=forms.length;//Si se encuentra coincidencia se corta el ciclo
    }
  }
}

function obtenerID(){
  var fechas = "";
  var fechaHasta = "";
  for(a=0; a<=formulario.elements.length-1; a++){
    if(formulario.elements[a].type=='hidden'){
      fechas += (formulario.elements[a].id) + ";";   
    }
    else{
      if(formulario.elements[a].id=='sucursal'){
        //alert(formulario.elements[a].value)      
      }
    }
  }
}

function enviarDatos(e){
  if (window.event)//IE
    window.event.returnValue=false;
  else
    if(e)
      e.preventDefault();//Evita que el navegador dirija a la direccion especificada 
  enviarFormulario();
}


function retornarDatos(){
    obtenerID();
    var IDSucursal=selects();
    var cad='';
    var fechaDesde=document.getElementById('sqlFechaDesde1').value;
    var fechaHasta=document.getElementById('sqlFechaHasta1').value;
    cad='IDSucursal='+encodeURIComponent(IDSucursal)+'&fechaDesde1='+encodeURIComponent(fechaDesde)+'&fechaHasta1='+encodeURIComponent(fechaHasta);
  return cad;
}

function selects(){
  var select = document.getElementById('sucursal');
  var IDSucursales ="";
    if(select.selectedIndex != undefined && select.selectedIndex != -1){//Recorro la longitud del select
      for(j=0; j < select.options.length; j++){ 
        if(select.options[j].selected == true){//Se buscan solo los seleccionados
          IDSucursales += escape(select.options[j].value)+';';//Acumulo en un string cada valor separado por punto y coma
        }
      }
    }
  return IDSucursales;
}

var conexion;
function enviarFormulario() 
{
  conexion=nuevoAjax();
  /*conexion1.onreadystatechange = procesarEventos;*/
  conexion.onreadystatechange = function(){
    if (conexion.readyState==4){
      document.getElementById("tablaGastos").innerHTML=conexion.responseText;
    }
    else{ 
      /*document.getElementById("tablaGastos").innerHTML='<p class="load">Cargando...</p>';*/
    }
  }

  conexion.open('POST','../../../negocio/listarGastos.php', true);
  conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion.send(retornarDatos());  
}

function enviarvariable(variable){ //funcion encargada de inviar la variable al archivo php
  conexion=nuevoAjax();
    conexion.onreadystatechange = function(){
    if (conexion.readyState==4){
      document.getElementById("1").innerHTML=conexion.responseText;
    }
    else{ 
      /*document.getElementById("tablaGastos").innerHTML='<p class="load">Cargando...</p>';*/
    }
  }

  conexion.open('POST','../../../../negocio/DetalleCantidad.php', true);
  conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion.send('variable=' + variable);  
}

//Funcion generica para agregar cualquier evento
function addEvent(elemento,nomevento,funcion,captura){
  if (elemento.attachEvent){//IE
    elemento.attachEvent('on'+nomevento,funcion);
    return true;
  }
  else//Chrome, Firefox, etc.
    if(elemento.addEventListener){
      elemento.addEventListener(nomevento,funcion,captura);
      return true;
    }
    else
      return false;
}

function pasarVariables(a,b,c,d){
  var valor = a + ";" + b + ";" + c + ";" + d;
  enviarvariable(valor);
}

function recuperarFila(idfila){//Recupera los valores de los campos de la fila seleccionada
  var a = '';
  var elTableRow = document.getElementById(idfila);
  var elTableCells = elTableRow.getElementsByTagName("td");
      for(var i=0; i<elTableCells.length; i++){
        if(isNaN(idfila)){
          if(i!=2){
            a += elTableCells[i].innerHTML + ';';//Concatena cada elemento de la fila seleccionada
            if(i == elTableCells.length-1){
              agregarFila(a);
            }
          }
        }
        else{
          var span = document.getElementById('r'+i);
          span.innerText = elTableCells[i].innerHTML;
          if(i == elTableCells.length-1){
              var idProveedor = elTableCells[i].innerHTML;
              document.getElementById('Proveedor').value = idProveedor;
            }
        }
      }
  }

function cambiarClase(e){//Esta funcion cambia el class name de las pestañas en tiempo de ejecucion
  if(e=='tab2'){
    document.getElementById('tab2').className = (document.getElementById('tab2').className == 'liTabs') ? 'liTabs tabActiva' : 'liTabs';
    document.getElementById('tab1').className = 'liTabs';
    document.getElementById('tabsArticulos').className = 'busquedas solapa divActiva';
    document.getElementById('tabsProveedores').className = 'busquedas solapa';
  }
  else{
    document.getElementById('tab1').className = (document.getElementById('tab1').className == 'liTabs') ? 'liTabs tabActiva' : 'liTabs';
    document.getElementById('tab2').className = 'liTabs';
    document.getElementById('tabsArticulos').className = 'busquedas solapa';
    document.getElementById('tabsProveedores').className = 'busquedas solapa divActiva';
  }

}

function pasarVariable(value,cell,decimal,row){
  var posicion2 = 'input' + row;
  var rest = document.getElementById(posicion2).value;
  var numSting = cell + '.' + decimal;
  var numDecimal = parseFloat(numSting);//Numero a restar
  
  var subTotal = value * numDecimal;//este valor hay que imprimir
  var subTotalRestar = subTotal;//mejor este
  subTotal = subTotal.toFixed(2);
  var posicion = 'campo' + row;
  subTotal = subTotal.replace(".",",");
  var nuevoSubTotal = document.getElementById(posicion).innerHTML;
  nuevoSubTotal = nuevoSubTotal.replace(",",".");
  nuevoSubTotal = parseFloat(nuevoSubTotal);
  document.getElementById(posicion).innerHTML = subTotal;

  var total = document.getElementById('total').innerHTML;
  total = total.replace(",",".");
  
  total = parseFloat(total);
  totalRestado = total - numDecimal;
  if(subTotalRestar<nuevoSubTotal){
    total = total - nuevoSubTotal;
    total = total + subTotalRestar;
    total = total.toFixed(2);
    total = total.replace(".",",");
    document.getElementById('total').innerHTML = total;
    document.getElementById('total2').value = total;
  }
  else{
    total1 = totalRestado + subTotalRestar;
    total1 = total1.toFixed(2);
    to = total1.replace(".",",");
    document.getElementById('total').innerHTML = to;
    document.getElementById('total2').value = to;
  }
}

/*Esta funcion toma el valor del index de la fila seleccionada, lo disminuye en 1, obtiene el valor del subtotal de esa fila, obtiene el valor del total general
 resta el valor de la fila al valor del total e imprime el nuevo total general*/
function eliminarFila(index){
  var posicionCampo = 'campo' + index;//Se crea el id del campo en cuestion, sabiendo como esta constituido
  var valorCampo = document.getElementById(posicionCampo).innerHTML;//Obtiene el valor de dicho campo
  var valorCampoReemplazado = valorCampo.replace(",",".");//Reemplaza la coma por punto
  var valorCampoFlotante = parseFloat(valorCampoReemplazado);//Transforma a float el string
  var total = document.getElementById('total2').value;//Obtiene el valor del input que contiene el total general del pedido
  var totalReemplazado = total.replace(",",".");//Reemplaza la coma por punto
  var totalFlotante = parseFloat(totalReemplazado);//Transforma a float el string
  var newTotal = totalFlotante - valorCampoFlotante;//Calcula el nuevo valor total
  total1 = newTotal .toFixed(2);
  var to = total1.replace(".",",");
  document.getElementById('total').innerHTML = to;
  document.getElementById('total2').value = to;
}

function deleteRow(r){
  var i=r.parentNode.parentNode.rowIndex;
  document.getElementById('detalle').deleteRow(i);
}

function agregarFila(cells){
  var id = 'detalle';
  var tabla = document.getElementById(id);
  var lastRow = tabla.rows.length;

  var idInputEntero = 'input' + lastRow;
  var num = 1;
  var ab = 1;
  var arrayCells = cells.split(';');
  var cell0 = arrayCells[0];
  var cell00 = '<input type="hidden" name="IDsArticulos[]" value="'+cell0+'"></input>';
  var cell1 = arrayCells[1];
  var cell2 = arrayCells[2];
  var cell11 = '<input type="hidden" name="precios[]" value="'+cell2+'"></input>';
  var cell3 = '<input class="entero" id="'+idInputEntero+'" name="cantidades[]" onchange=pasarVariable(value,'+cell2+','+lastRow+'); value="1" onkeypress="return permiteEscribir(event,this);"></input>';

  var elTableRow;
  var celdas;
  var valor;
  var verificar = 0;
  if(document.getElementById(cell1)){
    verificar = 1;
  }

  if(verificar==0){
    var t = document.getElementById('total2').value;
    var totalReemplazado = t.replace(",",".");
    var totalFlotante = parseFloat(totalReemplazado);
    var valorCelda = cell2;
    var valorCeldaTerminado = valorCelda.replace(",",".");
    var subTotal = parseFloat(valorCeldaTerminado);
    var totalGeneral = totalFlotante + subTotal;
    totalGenera = totalGeneral.toFixed(2);
    totalGen = totalGenera.replace(".",",");
    document.getElementById('total').innerHTML = totalGen;
    document.getElementById('total2').value = totalGen;
  }
  
  var cell4 = cell2;
  var cell5 = '';

  var tbody = document.getElementById
  (id).getElementsByTagName("TBODY")[0];
  var row = document.createElement("TR")
  var td0 = document.createElement("TD")
  var td1 = document.createElement("TD")
  var td2 = document.createElement("TD")
  var td3 = document.createElement("TD")
  var td4 = document.createElement("TD")
  var td5 = document.createElement("TD")
  var td6 = document.createElement("TD")

  if(lastRow%2 == 0){
    row.className = 'par';
  }
  else{
    row.className = 'impar';
  }

  td0.className = 'none';
  
  td2.className = 'numero';
  td3.className = 'none';
  td4.className = 'inputCenter';
  td5.className = 'numero';
  td6.className = 'iconCenter';
  td1.id = cell1;
  td5.id = 'campo' + lastRow;

  row.appendChild(td0).innerHTML = cell00;
  row.appendChild(td1).innerHTML = cell1;
  row.appendChild(td2).innerHTML = cell2;
  row.appendChild(td3).innerHTML = cell11;
  row.appendChild(td4).innerHTML = cell3;
  row.appendChild(td5).innerHTML = cell4;
  row.appendChild(td6).innerHTML = '<a href="#" onclick="eliminarFila('+ lastRow +');deleteRow(this);"><img src="../../../img/eliminar.gif" title="Borrar"/></a>';
  if(verificar==0){
    tbody.appendChild(row);
  }
}

function permiteEscribir(elEvento, elemento){
  // Obtener la tecla pulsada 
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    
    // Comprobar si la tecla pulsada es alguna de las teclas especiales
    // (teclas de borrado y flechas horizontales)
    var teclasEspeciales = [9, 37, 39]; // backspace, tab, left arrow, right arrow
    var teclaEspecial = false;
    for(var i in teclasEspeciales){
        if(codigoCaracter == teclasEspeciales[i]){
            teclaEspecial = true;
            break;
        }
    }
    
    var entero = "0123456789";
    var permitir = false;
    var permitidos = entero;

    if(elemento.value.length < 10 || teclaEspecial){
      if ((permitidos.indexOf(caracter) != -1 || teclaEspecial) ){
        permitir = true;
      }
    }
  return permitir;
}

function validarPedido(){
  var id = 'detalle';
  var tabla = document.getElementById(id);
  var last = tabla.rows.length;
  var prov = document.getElementById('Proveedor').value;
  if(last <= 2 && prov != ' '){
      return false;
  }
  else{
    if(isNaN(prov)){
      return false;
    }
  }
}

function clickFilaCliente(id){
  //alert(id);
  inputHidden = buscarTipoInput('Hidden');
  inputHidden = buscarInputPorIdFila(id, inputHidden);
  insertarFilas(inputHidden, id);
  url = document.getElementById('BASE_URL').value;
  url = url + "/vista/procesos/ventas/tablaCobranzas.php?IDCliente="+id;
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