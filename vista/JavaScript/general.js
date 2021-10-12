function prevenirAccionPorDefecto(evt) {
    evt.preventDefault();
}

function dispararEvento(sIdElemento, sNombreEvento) {
    evt = document.getElementById(sIdElemento)[sNombreEvento];

    if (typeof(evt) == "function") {
        document.getElementById(sIdElemento)[sNombreEvento]();
    }
}
 