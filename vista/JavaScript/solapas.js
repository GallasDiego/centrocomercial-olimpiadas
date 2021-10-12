function asignarEventoClicSolapas() {

    var aLinks = document.getElementsByClassName('aTabs');
    var oLink;
    var aPartesUrl;
    var oDivSeleccionado;
    var aDivs;
    var oDiv;
    var aLis;
    var oLi;
    
    for(var i=0; i < aLinks.length; i++) {
        oLink = aLinks[i];
        
        // Asociamos la accion/funcion al evento click
        oLink.onclick = function (evt) {
            prevenirAccionPorDefecto(evt);
            aPartesUrl = this.href.split('/');
            oDivSeleccionado = document.getElementById(aPartesUrl[aPartesUrl.length - 1]);
            if(oDivSeleccionado) {
                aDivs = document.getElementsByClassName('solapa');
                for(var j=0; j < aDivs.length; j++) {
                    oDiv = aDivs[j];
                    oDiv.className = oDiv.className.replace(/ divActiva/g, '');
                }
                if(oDivSeleccionado.className.indexOf(' divActiva') == -1)
                    oDivSeleccionado.className += ' divActiva';
                
                aLis = document.getElementsByClassName('liTabs');
                for(var k=0; k < aLis.length; k++) {
                    oLi = aLis[k];
                    oLi.className = oLi.className.replace(/ tabActiva/g, '');
                }
                
                if(this.parentNode.className.indexOf(' tabActiva') == -1)
                    this.parentNode.className += ' tabActiva';
            }
            return false;
        };
        //oLink.addEventListener('click', prevenirAccionPorDefecto, false);
    }

}

if (document.addEventListener) {
    window.addEventListener('load', asignarEventoClicSolapas, false);
}
else {
    window.attachEvent('onload', asignarEventoClicSolapas);
}