function horaActual() {
    var oDate = new Date();
    
    var horas = oDate.getHours();
    var minutos = oDate.getMinutes();
    var segundos = oDate.getSeconds();
    
    if (horas < 10) {horas = "0" + horas}
    if (minutos < 10) {minutos = "0" + minutos}
    if (segundos < 10) {segundos = "0" + segundos}
    
    return  horas + ":" + minutos; // + ":" + segundos;
}

function fechaActual() {
    var oDate = new Date();

    var dia = oDate.getDate();
    var mes = oDate.getMonth() + 1;
    var anio = oDate.getFullYear();
    
    dia = (dia < 10) ? "0" + dia : "" + dia;
    mes = (mes < 10) ? "0" + mes : "" + mes;


    return dia + "/" + mes + "/" + anio;
}

function darVueltaFecha(fecha) {
    var f = fecha.split('/');
    var dia = f[0];
    var mes = f[1];
    var anio = f[2];
    return anio + mes + dia;
}

function escribirHoraActual() {
    // Verificamos que exista el elemento y que ademas sea un SPAN,
    // Por lo tanto esta funcion debe ser aplicada a un SPAN
    if(document.getElementById('fechaHoraActual') && document.getElementById('fechaHoraActual').tagName.toUpperCase() == 'SPAN') {
        document.getElementById('fechaHoraActual').innerHTML = fechaActual() + ' - ' + horaActual();
        
        // Asociamos el id del Intervalo a la variable global idTimeOutHoraActual
        idTimeOutHoraActual = setTimeout('escribirHoraActual()', 10000);
        // Si fuera necesario "matar" el intervalo ejecutar la siguiente linea de codigo desde cualquier parte de la pagina
        // clearsetTimeout(idTimeOutHoraActual);
    }
}

var idTimeOutHoraActual = null;

if (document.addEventListener) {
    window.addEventListener('load', escribirHoraActual, false);
}
else {
    window.attachEvent('onload', escribirHoraActual);
}