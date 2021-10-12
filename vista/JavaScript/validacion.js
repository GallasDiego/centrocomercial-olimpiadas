// http://www.javascript-coder.com/html-form/javascript-form-validation.phtml
// http://www.overset.com/2006/12/01/simple-javascript-form-field-onkeydown-regular-expression-wrapper/
// http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
// http://idesweb.es/proyecto/proyecto-prac06-js-expresiones-regulares-dom
// http://www.regular-expressions.info/javascript.html
// http://www.regular-expressions.info/php.html
// http://www.regular-expressions.info/javascriptexample.html
// http://www.regular-expressions.info/examples.html
// http://www.regular-expressions.info/reference.html
// http://www.regular-expressions.info/posixbrackets.html
// http://stackoverflow.com/questions/10940137/regex-test-v-s-string-match-to-know-if-a-string-matches-a-regular-expression
// http://regexlib.com/Search.aspx?k=percent

function esFechaMenor(fechaInicio, fechaFinal) {
    var fechaIni = darVueltaFecha(fechaInicio);
    var fechaFin = darVueltaFecha(fechaFinal);
    
    return fechaIni < fechaFin;
}

function esFechaMenorIgual(fechaInicio, fechaFinal) {
    var fechaIni = darVueltaFecha(fechaInicio);
    var fechaFin = darVueltaFecha(fechaFinal);
    
    return fechaIni <= fechaFin;            
}

function esVacio(contenido) {
    var patron = /^\s*$/;
    return patron.test(contenido);
}

function esAlfaNumerico(contenido) {
    var patron = /^[A-Za-z][A-Za-z0-9\sáéíóúÁÉÍÓÚ\.\-@']*$/;
    return esVacio(contenido) || patron.test(contenido);
}

function esAlfaNumericoEstricto(contenido) {
    var patron = /^[A-Za-z][A-Za-z0-9\sáéíóúÁÉÍÓÚ]*$/;
    return esVacio(contenido) || patron.test(contenido);
}

function esPassword(contenido) {
    var patron = /^[A-Za-z0-9]*$/;
    return esVacio(contenido) || (patron.test(contenido) && contenido.length >= 4 && contenido.length <= 15);
}

function esEntero(contenido) {
    var patron = /^\d*$/; //_____xxxxxx
    return esVacio(contenido) || patron.test(contenido);
}

function esDecimal(contenido) {
    var patron = /^\d+(\.\d{1,})?$/; // ____xxxxx.xxxxxx______
    return esVacio(contenido) || patron.test(contenido);
}

function esPorcentaje(contenido) {
    //var patron = /(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,})?$/; // xx.xxxxx_____
    var patron = /(?!^0*$)(?!^0*\.0*$)^\d{1,2}(\.\d{1,2})?$/; // xx.xx
    return esVacio(contenido) || patron.test(contenido);
}

function esMoneda(contenido) {
    var patron = /^\d+(\.\d{1,2})?$/; //____xxxx.xx
    return esVacio(contenido) || patron.test(contenido);
}

function esTelefono(contenido) {
    var patron = /^\(0(\d{2,4})\)\s+(\d{2,4})-(\d{4,8})+(\/\d{1,4})?$/;
    return esVacio(contenido) || patron.test(contenido);
}

function esEmail(contenido) {
    var patron = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/; // usuario@dominio
    return esVacio(contenido) || patron.test(contenido);
}

function comprobarSiBisisesto(anio) {
    if ((anio % 100 != 0) && ((anio % 4 == 0) || (anio % 400 == 0))) {
        return true;
    }
    else {
        return false;
    }
}

function esFecha(contenido) {
    if(esVacio(contenido))
        return true;
    
    var patron = /^(0[1-9]|1\d|2\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/; // dd/mm/aaaa
    if(!patron.test(contenido))
        return false;
        
    var hayError = false;
    if (contenido.length == 10) {
        var fecha = contenido.split('/');
        var dia = fecha[0];
        var mes = fecha[1];
        var anio = fecha[2];
        var numDias = 0;
        switch(mes) {
            case '02':
                if (comprobarSiBisisesto(anio)) { 
                    numDias = 29;
                }
                else { 
                    numDias = 28;
                }
                break;
            
            case '01':
            case '03':
            case '05':
            case '07':
            case '08':
            case '10':
            case '12':
                numDias = 31;
                break;
                
            case '04': 
            case '06': 
            case '09': 
            case '11':
                numDias = 30;
                break;
                
            default:
                hayError = true;
                break;
        }
        if (parseInt(dia) > numDias || parseInt(dia) == 0) {
            hayError = true;
        }
    }
    else {
        hayError = true;
    }
    return !hayError;
}

function esCuit(contenido) {
    
    if(esVacio(contenido))
        return true;
    
    var patron = /^\d{2}\-\d{8}\-\d{1}$/; // xx-xxxxxxxx-x
    if(!patron.test(contenido))
        return false;
    
    contenido = contenido.toString().replace(/[-_]/g, "");
    if (contenido.length != 11)
        return false;
    else {
        var mult = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
        var total = 0;
        for (var i = 0; i < mult.length; i++) {
            total += parseInt(contenido[i]) * mult[i];
    }
    var mod = total % 11;
    var digito = mod == 0 ? 0 : mod == 1 ? 9 : 11 - mod;
    }
    return digito == parseInt(contenido[10]);
}

function escribirError(idElemento, mensajeError) {
    if(document.getElementById(idElemento)) {
        var spanError = document.getElementById(idElemento);
        spanError.title = mensajeError;
        if(mensajeError.length) {
            if(spanError.className.indexOf(" error") == -1)
                spanError.className += " error";
            
        }
        else {
            spanError.className = spanError.className.replace(/ error/g, "");
        }

    }
}

function validarFechaDesdeHasta(idNumerico) {
    var inputFechaDesde = document.getElementById('fechaDesde'+idNumerico);
    var inputFechaHasta = document.getElementById('fechaHasta'+idNumerico);
    if(!inputFechaDesde && !inputFechaHasta)
        return true;
    
    var fechaDesde = inputFechaDesde.value;
    var fechaHasta = inputFechaHasta.value;
    var fechaHoy = fechaActual();
    var aErrores = new Array();
    var idSpan = 'fechaDesdeHasta' + idNumerico + 'Error';
    var huboError = false;
    
    if(!esVacio(fechaDesde) && esFecha(fechaDesde) && !esVacio(fechaHasta) && esFecha(fechaHasta)) {
        if(!esFechaMenorIgual(fechaDesde, fechaHoy)) {
            aErrores.push('La Fecha Desde debe ser menor o igual que la Fecha Actual');
            huboError = true;
        }
        if(!esFechaMenorIgual(fechaDesde, fechaHasta)) {
            aErrores.push('La Fecha Desde debe ser menor o igual que la Fecha Hasta');
            huboError = true;
        }

    }
    else
        return true;
        
    if(huboError) {
        inputFechaDesde.style.backgroundColor = '#FFA1A1';
        inputFechaHasta.style.backgroundColor = '#FFA1A1';
        escribirError(idSpan, aErrores.join());
        return false;
    }
    else {
        inputFechaDesde.style.backgroundColor = '#ECF4FF';
        inputFechaHasta.style.backgroundColor = '#ECF4FF';
        escribirError(idSpan, '');
        return true;
    }

}

/* Funcion para validar el Elemento */
function validarElemento(elemento) {

    var aClasses = elemento.className.split(' ');
    var sTipoEtiqueta = elemento.type.toLowerCase();
    var aErrores = new Array();
    var bErrorRequerido;
    var bErrorClase;
    var bErrorElem = false;
    var bChecked;
    var numeroIdFechaDesdeHasta;
    var passwd;
    
    for(var i=0; i < aClasses.length; i++) {
    
        bErrorClase = false;
        
        switch(aClasses[i].toLowerCase()) {
            case 'requerido':
                bErrorRequerido = false;
                switch(sTipoEtiqueta) {
                    case 'checkbox':
                    case 'radio':
                        var oElementos = document.getElementsByName(elemento.name);
                        bChecked = false;
                        for(var i=0; i < oElementos.length; i++) {
                            if(oElementos[i].checked) {
                                bChecked = true;
                                break;
                            }
                        }
                        if(!bChecked) {
                            bErrorRequerido = true;
                        }
                        break;
                    default:
                        if(esVacio(elemento.value)) {
                            bErrorRequerido = true;
                        }
                        break;
                }
                if(bErrorRequerido) {
                    aErrores.push('Este campo es obligatorio');
                    bErrorClase = true;
                }
                break;
            case 'alfanumericoestricto':
                if(!esAlfaNumericoEstricto(elemento.value)) {
                    aErrores.push('Debe ingresar caracteres alfanumericos');
                    bErrorClase = true;
                }
                break;
            case 'alfanumerico':
                if(!esAlfaNumerico(elemento.value)) {
                    aErrores.push("Debe ingresar caracteres alfanumericos y áéíóúÁÉÍÓÚ.-@'");
                    bErrorClase = true;
                }
                break;
            
            case 'email':
                if(!esEmail(elemento.value)) {
                    aErrores.push('Debe ingresar una direccion de correo válida usuario@dominio');
                    bErrorClase = true;
                }
                break;
            
            case 'fecha':
                if(!esFecha(elemento.value)) {
                    aErrores.push('Debe ingresar una formato dd/mm/aaaa y fecha válida');
                    bErrorClase = true;
                }
                break;
            case 'fechaactual':
                if(!esFecha(elemento.value)) {
                    aErrores.push('Debe ingresar una formato dd/mm/aaaa y fecha válida');
                    bErrorClase = true;
                }
                else if(!esFechaMenorIgual(elemento.value, fechaActual())) {
                    aErrores.push('La Fecha seleccionada debe ser menor o igual que la Fecha Actual');
                    bErrorClase = true;
                }
                break;
            case 'fechadesde':
            case 'fechahasta':
                numeroIdFechaDesdeHasta = elemento.id.replace('fechaDesde', '').replace('fechaHasta', '');
                if(!validarFechaDesdeHasta(numeroIdFechaDesdeHasta)) {
                    bErrorClase = true;
                }
                break;
            case 'entero':
                if(!esEntero(elemento.value)) {
                    aErrores.push('Debe ingresar un número entero');
                    bErrorClase = true;
                }
                break;
            case 'decimal':
                if(!esDecimal(elemento.value)) {
                    aErrores.push('Debe ingresar un número decimal');
                    bErrorClase = true;
                }
                break;
            case 'porcentaje':
                if(!esPorcentaje(elemento.value)) {
                    aErrores.push('Debe ingresar un número porcentual xx.xx');
                    bErrorClase = true;
                }
                break;
            case 'moneda':
                if(!esMoneda(elemento.value)) {
                    aErrores.push('Debe ingresar valor monetario xxxx.xx');
                    bErrorClase = true;
                }
                break;
            case 'cuit':
                if(!esCuit(elemento.value)) {
                    aErrores.push('Debe ingresar un formato xx-xxxxxxxx-x y número de cuit válido');
                    bErrorClase = true;
                }
                break;
            case 'telefono':
                if(!esTelefono(elemento.value)) {
                    aErrores.push('Debe ingresar un número de teléfono válido (0xxxx) xxxx-xxxx/xxxx');
                    bErrorClase = true;
                }
                break;
            case 'password':
                if(!esPassword(elemento.value)) {
                    aErrores.push('Debe ingresar una contraseña alfanumerica de 4 a 15 caracteres');
                    bErrorClase = true;
                }
                break;
            case 'passwordconfirmacion':
                passwd = document.getElementById(elemento.id.replace('confirmacion', ''));
                if(!passwd || passwd.value!=elemento.value) {
                    aErrores.push('La constraseña ingresada y su confirmación NO coinciden');
                    bErrorClase = true;
                }
                break;
        }
        
        if(bErrorClase) {
            bErrorElem = true;
        }
    }
    
    var idSpan = elemento.name + 'Error'; 
    if(bErrorElem) {
        elemento.style.backgroundColor = '#FFA1A1';
        escribirError(idSpan, aErrores.join());
        return false;
    }
    else {
        elemento.style.backgroundColor = '#ECF4FF';
        escribirError(idSpan, '');
        return true;
    }
}

function limpiarErrores(formulario) {
    var aSpans = formulario.getElementsByClassName('mensajeError');
    var oSpan;
    for(var i=0; i < aSpans.length; i++) {
        oSpan = aSpans[i];
        oSpan.className = oSpan.className.replace(/ error/g, "");
        oSpan.title = "";
    }
}

/*Funcion para validar el formulario*/
function validarFormulario(formulario) {
    limpiarErrores(formulario);
    var bErrorGlobal = false; // Variable para setear si hay errores a nivel global
    var bOk; // Variable para setear si hay errores a nivel local
    var aElementos = formulario.elements;
    var oElemento; // Variable para ir almacenando c/u de los elementos
    var sNombreEtiqueta;
    var sClase;
    var bDisable;
    var aCheckRadioError = new Array();
    
    for(var i=0; i < aElementos.length; i++) {
    
        oElemento = aElementos[i];
        
        // Si el campo seleccionado es el Fieldset => Continuamos hasta el final del FOR
        sNombreEtiqueta = oElemento.tagName;
        if(sNombreEtiqueta.indexOf('FIELDSET') !== -1)
            continue;
        
        sClase = oElemento.className;
        bDisable = oElemento.disabled;
        if (!bDisable && sClase.indexOf('validar') !== -1 ) {
            bOk = true;
            
            // Si NO ES un radio/checkbok => valido Elemento
            if(oElemento.type.toLowerCase() != 'radio' && oElemento.type.toLowerCase() != 'checkbox')
                bOk = validarElemento(oElemento);
            
            // Si es la 1era vez del grupo de radio/checkbok => valido Elemento
            else if(typeof(aCheckRadioError[oElemento.name]) == 'undefined')
                bOk = validarElemento(oElemento);
            
            if(!bOk) {
                if(oElemento.type.toLowerCase() == 'radio' || oElemento.type.toLowerCase() == 'checkbox')
                    aCheckRadioError[oElemento.name] = true;
                bErrorGlobal = true;
            }
        }
    }

    if(bErrorGlobal)
        alert('Atención!\n\nVerifique los errores...');
    
    return !bErrorGlobal;
}

function obtenerPosicionCursor(oField) {

  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart ('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionStart;

  // Return results
  return (iCaretPos);
}

function permitirEscribir(elEvento, tipo, elemento) {

    // Obtener la tecla pulsada 
    var evento = elEvento || window.event;
    var codigoCaracter = evento.charCode || evento.keyCode;
    var caracter = String.fromCharCode(codigoCaracter);
    
    // Comprobar si la tecla pulsada es alguna de las teclas especiales
    // (teclas de borrado y flechas horizontales)
    var teclasEspeciales = [9, 37, 39]; // backspace, tab, left arrow, right arrow
    var teclaEspecial = false;
    for(var i in teclasEspeciales) {
        if(codigoCaracter == teclasEspeciales[i]) {
            teclaEspecial = true;
            break;
        }
    }
    
    // Obtener posicion cursor
    var posCursor = obtenerPosicionCursor(elemento);

    // Valores permitidos en c/u de los casos
    var entero = "0123456789";
    var decimal = "0123456789.";
    var cuit = "0123456789";
    var fecha = "0123456789";
    var telefono = " ()-/0123456789";
    var letra = " 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ";
    var email = ".@abcdefghijklmnopqrstuvwxyz";
    var alfanumerico = " '.@-0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ";
    var alfanumericoEstricto = " 0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚ";
    var password = "0123456789abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    var aParteEnteraDecimal;
    var sParteDecimal;
    

    
    var permitir = false;
    switch(tipo) {
        case 'entero':
            permitidos = entero;
            break;
        case 'decimal':
            permitidos = decimal;
            break;
        case 'porcentaje':
            permitidos = decimal;
            break;
        case 'letra':
            permitidos = letra;
            break;
        case 'alfanumerico':
            permitidos = alfanumerico;
            break;
        case 'alfanumericoEstricto':
            permitidos = alfanumericoEstricto;
            break;
        case 'fecha':
            permitidos = fecha;
            break;
        case 'moneda':
            permitidos = decimal;
            break;
        case 'cuit':
            permitidos = cuit;
            break;
        case 'telefono':
            permitidos = telefono;
            break;
        case 'email':
            permitidos = email;
            break;
        case 'password':
            permitidos = password;
            break;
        
        default:
            break;
    }
    
    var tienePunto;

    if (tipo == 'fecha') {
        if(elemento.value.length < 10 || teclaEspecial) {
            if ((permitidos.indexOf(caracter) != -1 || teclaEspecial) ) {
                permitir = true;
            }
            // Verifico que al ingresar 2 o 5 caracters ya se agregue la barra separadora
            if((elemento.value.length == 2 || elemento.value.length == 5) && !teclaEspecial)
                elemento.value = elemento.value + '/';
        }
    }
    else if(tipo == 'cuit') {
        if(elemento.value.length < 13 || teclaEspecial) {
            if ((permitidos.indexOf(caracter) != -1 || teclaEspecial) ) {
                permitir = true;
            }
            // Verifico que al ingresar 2 o 11 caracters ya se agregue el guion
            if((elemento.value.length == 2 || elemento.value.length == 11) && !teclaEspecial)
                elemento.value = elemento.value + '-';
        }
    }
    else if(tipo == 'decimal' || tipo == 'porcentaje' || tipo == 'moneda') {
        
        if ((permitidos.indexOf(caracter) != -1 || teclaEspecial) ) {
            
            // Si el campo ya tiene un punto Y se intenta ingresar otro punto => FALSO
            if(elemento.value.indexOf('.') != -1 && caracter=='.') {
                permitir = false;
            }
            else if(caracter=='.') {
                permitir = elemento.value.length != 0;
            }
            else {
                tienePunto = elemento.value.indexOf('.') != -1 ? true : false;
                aParteEnteraDecimal = elemento.value.split('.');
                sParteEntera = aParteEnteraDecimal[0];
                sParteDecimal = aParteEnteraDecimal.length > 1 ?  aParteEnteraDecimal[1] : '';

                switch(tipo) {
                    case 'porcentaje':
                        if(tienePunto) {
                            if(posCursor < elemento.value.indexOf('.')){
                                permitir = sParteEntera.length < 2 ? true : false;
                            }
                            else
                                permitir = true;
                        }
                        else {
                            permitir = sParteEntera.length < 2 ? true : false;
                        }
                        break;
                    case 'moneda':
                        if(tienePunto) {
                            if(posCursor > elemento.value.indexOf('.')){
                                permitir = sParteDecimal.length < 2 ? true : false;
                            }
                            else
                                permitir = true;
                        }
                        else {
                            permitir = true;
                        }
                        break;
                    default:
                        permitir = true;
                        break;
                }
            }
        }
    }
    else if(tipo == 'email') {

        if ((permitidos.indexOf(caracter) != -1 || teclaEspecial) ) {
            
            // Si el campo ya tiene un @ Y se intenta ingresar otro @ => FALSO
            if(elemento.value.indexOf('@') != -1 && caracter=='@') {
                permitir = false;
            }
            else if(caracter=='@') {
                permitir = elemento.value.length != 0;
            }
            else
                permitir = true;
        }
    }
    else if(tipo == 'password') {
        if ((permitidos.indexOf(caracter) != -1 && elemento.value.length < 15) || teclaEspecial) {
            permitir = true;
        }
        else
            permitir = false;
    }
    else if ((permitidos.indexOf(caracter) != -1 || teclaEspecial)) {
        permitir = true;
    }
    
    return permitir;
}

function asociarEventoValidarElemento() {
    var aFormularios = document.forms;
    var oFormulario;
    var aElementos;
    var oElemento;
    
    for(var i=0; i < aFormularios.length; i++) {
        oFormulario = aFormularios[i];
        aElementos = oFormulario.getElementsByClassName('validar')
        for(var i=0; i < aElementos.length; i++) {
            oElemento = aElementos[i];
            
            // Asociamos al evento onfocus()
            oElemento.onfocus = function(e) {
                // Reestablecemos el color de background
                this.style.backgroundColor = '#ECF4FF';
            };
            
            // Asociamos al evento onblur()
            oElemento.onblur = function(e) {
                validarElemento(this);
            };
        }
    }
    
    var aSpans = document.getElementsByClassName('mensajeError');
    var oSpan;
    for(var i=0; i < aSpans.length; i++) {
        oSpan = aSpans[i];
        
        // Asociamos al evento onclick()
        oSpan.onclick = function(e) {
            if(this.title.length)
                alert(this.title);
        };
    }
    
}

if (document.addEventListener) {
    window.addEventListener('load', asociarEventoValidarElemento, false);
}
else {
    window.attachEvent('onload', asociarEventoValidarElemento);
}
