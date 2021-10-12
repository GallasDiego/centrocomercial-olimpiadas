<?php
    require_once('../../../comun/configuracion.php');
    require_once('../../comun/modulos.php');

    $modulos = Modulos::getInstanceSingleton();

    if(isset($_REQUEST['idempleados']) && $_REQUEST['idempleados'] > 0) {
        //Se guarda el ID de Empleado en la variable $idempleados
        $idempleados = $_REQUEST['idempleados'];
        
        //Incluimos el archivo que modela la tabla de articulos
        require_once( BASE_PATH .DS. 'datos' . DS . 'dEmpledos.php');
        
        // Instanciamos el objeto con la conexion a la [BBDD].[Tabla]
        $dbEmpleados = new Empleados();
        
        // Recuperamos la fila del empleados en cuestion
        $condicion = " idempleados = '".$idempleados."'";
        $empleados = $dbEmpleados->seleccionarFila($condicion);
        
        $nombre = $empleados['nombre'];
        $dni = $empleados['dni'];
        $horarioEntrada = $empleados['horarioEntrada'];
        $horarioSalida = $empleados['horarioSalida'];
        $telefono = $empleados['telefono'];
        $edificio_idedificio = $empleados['edificio_idedificio'];
        
    }
    else {
        $idempleados = '';
        $nombre = '';
        $dni = '';
        $horarioEntrada = '';
        $horarioSalida = '';
        $telefono = '';
        $edificio_idedificio = '';
        
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
                        <h1 class="titulo"><?php echo (!$idempleados ? 'Nuevo' : 'Edición de ') ?> Empleado</h1>
                        <form id="formArticulo" name="formArticulo" method = "post" class="abmForm"  action="../../../negocio/empleados.php">
                            <fieldset>
                                <legend>Datos del Empleado</legend>
                                <span class="textoInformativo">Los campos con asterisco(*), son obligatorios</span>
                                <p>
                                    <label class="left">idEmpleados:</label>
                                    <input type="text" id="idempleados" name="idempleados" class="textoLargo"  readonly="readonly" value="<?php echo $idempleados; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">Nombre:</label>
                                    <input type="text" id="nombre" name="nombre" class="textoLargo" value="<?php echo $nombre; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">D.N.I:</label>
                                    <input type="text" id="dni" name="dni" class="textoLargo" value="<?php echo $dni; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">Horario Entrada:</label>
                                    <input type="time" id="horarioEntrada" name="horarioEntrada" class="textoLargo" min="00:00" max="23:59" step="600"value="<?php echo $horarioEntrada; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">Horario Salida:</label>
                                    <input type="time" id="horarioSalida" name="horarioSalida" class="textoLargo" min="00:00" max="23:59" step="600" value="<?php echo $horarioSalida; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">telefono:</label>
                                    <input type="text" id="telefono" name="telefono" class="textoLargo" value="<?php echo $telefono; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">Edificio:</label>
                                    <input type="text" id="edificio_idedificio" name="edificio_idedificio" class="textoLargo" value="<?php echo $edificio_idedificio; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p> 
                            </fieldset>
                            <div class="botones">
                                <p>
                                    <input type="submit" id="btnAceptar" name="btnAccion" value="<?php echo ($accion != 'eliminar' ? 'Actualizar' : 'Eliminar'); ?>" class="boton <?php echo ($accion != 'eliminar' ? 'aceptar' : 'eliminar'); ?>" <?php echo ($accion == 'eliminar' ? 'onclick="return confirm(\'¿Confirma eliminación?\');"' : ''); ?>  />                
                                    <input onclick="window.history.go(-1);" type="button" id="btnCancelar" name="accion" value="Cancelar" class="boton cancelar"/>
                                    <input type="hidden" id="IDArticulo" name="IDArticulo" value="<?php echo $IDArticulo ?>"/>
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