<?php
    require_once('../../../comun/configuracion.php');
    require_once('../../comun/modulos.php');

    $modulos = Modulos::getInstanceSingleton();

    if(isset($_REQUEST['idactividad']) && $_REQUEST['idactividad'] > 0) {
        //Se guarda el ID de Empleado en la variable $idactividad
        $idactividad = $_REQUEST['idactividad'];
        
        //Incluimos el archivo que modela la tabla de articulos
        require_once( BASE_PATH .DS. 'datos' . DS . 'dActividad.php');
        
        // Instanciamos el objeto con la conexion a la [BBDD].[Tabla]
        $dbActividad = new Actividad();
        
        // Recuperamos la fila del actividad en cuestion
        $condicion = " idactividad = '".$idactividad."'";
        $actividad = $dbActividad->seleccionarFila($condicion);
        
        $actividad = $actividad['actividad'];
        
        
    }
    else {
        $idactividad = '';
        $actividad = '';
        
        
    }

    
    //Obtenemos la accion a realizar
    $accion = $_GET['accion'];

?>

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
        <title>Administrar Empleados</title>
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
                        <h1 class="titulo"><?php echo (!$idactividad ? 'Nuevo' : 'Edición de ') ?> Actividad</h1>
                        <form id="formArticulo" name="formArticulo" method = "post" class="abmForm"  action="../../../negocio/Actividad.php">
                            <fieldset>
                                <legend>Datos de Actividad</legend>
                                <span class="textoInformativo">Los campos con asterisco(*), son obligatorios</span>
                                <p>
                                    <label class="left">IdActividad:</label>
                                    <input type="text" id="idactividad" name="idactividad" class="textoLargo"  readonly="readonly" value="<?php echo $idactividad; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">actividad:</label>
                                    <input type="text" id="actividad" name="actividad" class="textoLargo" value="<?php echo $actividad; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                               
                            </fieldset>
                            <div class="botones">
                                <p>
                                    <input type="submit" id="btnAceptar" name="btnAccion" value="<?php echo ($accion != 'eliminar' ? 'Actualizar' : 'Eliminar'); ?>" class="boton <?php echo ($accion != 'eliminar' ? 'aceptar' : 'eliminar'); ?>" <?php echo ($accion == 'eliminar' ? 'onclick="return confirm(\'¿Confirma eliminación?\');"' : ''); ?>  />                
                                    <input onclick="window.history.go(-1);" type="button" id="btnCancelar" name="accion" value="Cancelar" class="boton cancelar"/>
                                    <input type="hidden" id="idactividad" name="idactividad" value="<?php echo $idactividad ?>"/>
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