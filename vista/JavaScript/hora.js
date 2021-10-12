function hora(){
	var fecha = new Date()
	var hora = fecha.getHours()
	var minuto = fecha.getMinutes()
	if (hora < 10) {hora = "0" + hora}
	if (minuto < 10) {minuto = "0" + minuto}
	var horaNueva = hora + ":" + minuto
	document.getElementById('hora').innerHTML = horaNueva;
	tiempo = setTimeout('hora()',10000)
}
function fecha(){
	var fecha = new Date()
	var dia = fecha.getDate()
    var mes = fecha.getMonth() + 1
    var anio = fecha.getFullYear()
	var fecha = dia + "/" + mes + "/" + anio
	document.getElementById('fecha').innerHTML = fecha;
}