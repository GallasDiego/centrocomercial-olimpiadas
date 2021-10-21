<?php
    require_once('../../../comun/configuracion.php');
    require_once('../../comun/modulos.php');

    $modulos = Modulos::getInstanceSingleton();

    if(isset($_REQUEST['idedificio']) && $_REQUEST['idedificio'] > 0) {
        //Se guarda el ID de Empleado en la variable $idedificio
        $idedificio = $_REQUEST['idedificio'];
        
        //Incluimos el archivo que modela la tabla de articulos
        require_once( BASE_PATH .DS. 'datos' . DS . 'dEdificio.php');
        
        // Instanciamos el objeto con la conexion a la [BBDD].[Tabla]
        $dbEdifcio = new Edificio();
        
        // Recuperamos la fila del actividad en cuestion
        $condicion = " idedificio = '".$idedificio."'";
        $Edifcio = $dbEdifcio->seleccionarFila($condicion);
        
        $direccion = $Edifcio['direccion'];
        $tamanio = $Edifcio['tamanio'];
        $piso = $Edifcio['piso'];
        
        
    }
    else {
        $idedificio = '';
        $direccion = '';
        $tamanio = '';
        $piso = '';
        
        
    }

    
    //Obtenemos la accion a realizar
    $accion = $_GET['accion'];

?>

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
        <title>Administrar Edifcio</title>
        <link type="text/css" href="../../css/estilos.css" rel="stylesheet"></link>
        <script type="text/javascript" src="../../javaScript/validacion.js"></script>
        <script type="text/javascript" src="../../javaScript/validarArticulos.js"></script>
        
    </head>
    <body>
        <div id="envolturaPrincipal" class="envoltura">
            <div id="envolturaContenido" class="envoltura">
            <div id="top">
                <div id="logo1" class="logo"></div>
                <div id="cabecera">
                    <div id="menuNavegacion" class="envoltura">
                        <?php $modulos->incluirModulo('menu'); ?>
                         <div class="cleareone"> </div>   
                    </div>
                </div>
                <div id="logo2" class="logo"></div>
            </div>
                <div id="contenidoPrincipal">
                    <div class="relleno">
                        <h1 class="titulo"><?php echo (!$idedificio ? 'Nuevo' : 'Edición de ') ?> Edifcio</h1>
                        <form id="formArticulo" name="formArticulo" method = "post" class="abmForm"  action="../../../negocio/Edificio.php">
                            <fieldset>
                                <legend>Datos de Edifcio</legend>
                                <span class="textoInformativo">Los campos con asterisco(*), son obligatorios</span>
                                <p>
                                    <label class="left">IdActividad:</label>
                                    <input type="text" id="idedificio" name="idedificio" class="textoLargo"  readonly="readonly" value="<?php echo $idedificio; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">Direccion:</label>
                                    <input type="text" id="direccion" name="direccion" class="textoLargo" value="<?php echo $direccion; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">tama&ntildeo:</label>
                                    <input type="text" id="tamanio" name="tamanio" class="textoLargo" value="<?php echo $tamanio; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">piso:</label>
                                    <input type="text" id="piso" name="piso" class="textoLargo" value="<?php echo $piso; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                               
                            </fieldset>
                            <div class="botones">
                                <p>
                                    <input type="submit" id="btnAceptar" name="btnAccion" value="<?php echo ($accion != 'eliminar' ? 'Actualizar' : 'Eliminar'); ?>" class="boton <?php echo ($accion != 'eliminar' ? 'aceptar' : 'eliminar'); ?>" <?php echo ($accion == 'eliminar' ? 'onclick="return confirm(\'¿Confirma eliminación?\');"' : ''); ?>  />                
                                    <input onclick="window.history.go(-1);" type="button" id="btnCancelar" name="accion" value="Cancelar" class="boton cancelar"/>
                                    <input type="hidden" id="idedificio" name="idedificio" value="<?php echo $idedificio ?>"/>
                                </P>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="clearone"></div>
            </div>
             <div id="piePagina">
                <?php $modulos->incluirModulo('piePagina'); ?>
            </div>
        </div>
    </body>
</html>