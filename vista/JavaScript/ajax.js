function nuevoAjax() {
    var httpRequest = false;;
    if (window.XMLHttpRequest) {
        //El explorador implementa la interfaz de forma nativa
        httpRequest = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        //El explorador permite crear objetos ActiveX: versiones de IE
        try {
            httpRequest = new ActiveXObject("MSXML2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                httpRequest = false;
            }
        }
    }
    
    return httpRequest;
}

function setTBodyInnerHTML(tbody, html) {
    var temp = tbody.ownerDocument.createElement('div');
    temp.innerHTML = '<table><tbody id="'+tbody.id+'">' + html + '</tbody></table>';
    tbody.parentNode.replaceChild(temp.firstChild.firstChild, tbody);
}

function cargarContenido(urlSolicitada, idElementoDestino) {
    
    var oElemento;
    var sNombreEtiqueta;
    var aElementosReadOnlyInnerHTML = ["COL", "COLGROUP", "FRAMESET", "HEAD", "HTML", "STYLE", "TABLE", "TBODY", "TFOOT", "THEAD", "TITLE", "TR"];
    
    // Creo el nuevo objeto AJAX y envio al servidor el ID del elemento a cargar y la opcion seleccionada del select origen
    var ajax = nuevoAjax();
    if(ajax) {
        ajax.open("GET", urlSolicitada, true);
        ajax.onreadystatechange = function() {
            if (ajax.readyState==1) {
                document.body.style.cursor = 'wait';
            }
            if (ajax.readyState==4 && ajax.status==200) {
                
                document.body.style.cursor = 'default';
                
                if(document.getElementById(idElementoDestino)) {
                
                    oElemento = document.getElementById(idElementoDestino);
                    sNombreEtiqueta = oElemento.tagName.toUpperCase();
                    
                    if(sNombreEtiqueta == 'INPUT') {
                        oElemento.value = ajax.responseText;
                    }
                    else if(aElementosReadOnlyInnerHTML.indexOf(sNombreEtiqueta) == -1) {
                        oElemento.innerHTML = ajax.responseText;
                    }
                    else if(sNombreEtiqueta.indexOf("TBODY") != -1) {
                        setTBodyInnerHTML(oElemento, ajax.responseText);
                    }
                    else {
                        alert('El elemento destino, cuyo id="'+idElementoDestino+'", no posee propiedad "innerHTML" ni "value"!');
                    }
                    
                }
                else {
                    alert('El elemento destino, cuyo id="'+idElementoDestino+'", no existe!');
                }
            }
        }
        ajax.send(null);
    }
    else
        alert('No se pudo instanciar el objeto AJAX!');
}