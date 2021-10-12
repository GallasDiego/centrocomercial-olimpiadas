//Esta función se encarga de crear el objeto XMLHTTPRequest y lo devuelve.
function getXMLHTTPRequest(){
  try{
    req = new XMLHttpRequest();
  } catch(err1){
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (err2){
      try{
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (err3){
        req = false;
      }
    }
  }
  return req;
}


var http = getXMLHTTPRequest(); //creo una instancia del objeto XMLHTTPRequest.

/*function enviarvariable(variable){ //funcion encargada de inviar la variable al archivo php
    //var url = 'index.php?variable=' + variable;
    en("POST", url, true); //fijando los parametros para el envío de datos.
    //http.onreadystatechange = handler; //Qué función utilizar en caso de que el estado de la petición cambie.
    http.setRequestHeader("Content-Type"var url = '../../../../negocio/DetalleCantidad.php?'; // creación de la URL.
    http.op,"application/x-www-form-urlencoded");
    http.send(variable); //enviar petición.
}*/

function enviarvariable(variable){ //funcion encargada de inviar la variable al archivo php
    http.onreadystatechange = function(){
    if (http.readyState==4){
      document.getElementById("1").innerHTML=http.responseText;
    }
    else{ 
      /*document.getElementById("tablaGastos").innerHTML='<p class="load">Cargando...</p>';*/
    }
  }

  http.open('POST','../../../../negocio/DetalleCantidad.php', true);
  http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  http.send('variable=' + variable);  
}

function handler(){
  if (http.readyState == 4){
    if(http.status == 200){
      //alert(http.responseText); //El texto de respuesta del archivo index.php lo muestra como una alerta.
    }
  }
}

function a(a,b,c,d){
	var valor = a + ";" + b + ";" + c + ";" + d;
	//alert(valor);
	enviarvariable(valor);
}