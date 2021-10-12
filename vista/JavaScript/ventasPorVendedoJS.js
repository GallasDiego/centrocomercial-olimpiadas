addEvent(window,'load',detectarForm,false);
forms = new Array("formGastos","formComision","formVentasVendedor");//Array con los id de todos los formularios
var formulario = "";

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
      if(formulario.elements[a].id=='vendedor'){
       /* alert(formulario.elements[a].value)*/      
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
    var vendedor=selects();
    var cad='';
    var fechaDesde=document.getElementById('sqlFechaDesde1').value;
    var fechaHasta=document.getElementById('sqlFechaHasta1').value;
    cad='vendedor='+encodeURIComponent(vendedor)+'&fechaDesde1='+encodeURIComponent(fechaDesde)+'&fechaHasta1='+encodeURIComponent(fechaHasta);
  return cad;
}

function selects(){
  var select = document.getElementById('vendedor');
  var vendedor ="";
    if(select.selectedIndex != undefined && select.selectedIndex != -1){//Recorro la longitud del select
      for(j=0; j < select.options.length; j++){ 
        if(select.options[j].selected == true){//Se buscan solo los seleccionados
          vendedor += escape(select.options[j].value)+';';//Acumulo en un string cada valor separado por punto y coma
        }
      }
    }
  return vendedor;
}

var conexion;
function enviarFormulario() 
{
  /*conexion1=crearXMLHttpRequest();*/
  conexion=nuevoAjax();
  /*conexion1.onreadystatechange = procesarEventos;*/
  conexion.onreadystatechange = function(){
    if (conexion.readyState==4){
      document.getElementById("tablaVentasVendedor").innerHTML=conexion.responseText;
    }
    else{ 
      /*document.getElementById("tablaGastos").innerHTML='<p class="load">Cargando...</p>';*/
    }
  }

  conexion.open('POST','../../../../negocio/ventasPorVendedor.php', true);
  conexion.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion.send(retornarDatos());  
}

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