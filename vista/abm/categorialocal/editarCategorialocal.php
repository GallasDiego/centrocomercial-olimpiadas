<?php
    require_once('../../../comun/configuracion.php');
    require_once('../../comun/modulos.php');

    $modulos = Modulos::getInstanceSingleton();

    if(isset($_REQUEST['idcategoriaLocal']) && $_REQUEST['idcategoriaLocal'] > 0) {
        //Se guarda el ID de Empleado en la variable $idcategoriaLocal
        $idcategoriaLocal = $_REQUEST['idcategoriaLocal'];
        
        //Incluimos el archivo que modela la tabla de articulos
        require_once( BASE_PATH .DS. 'datos' . DS . 'dcategorialocal.php');
        
        // Instanciamos el objeto con la conexion a la [BBDD].[Tabla]
        $dbCategorialocal = new Categorialocal();
        
        // Recuperamos la fila del categorialocal en cuestion
        $condicion = " idcategoriaLocal = '".$idcategoriaLocal."'";
        $categorialocal = $dbCategorialocal->seleccionarFila($condicion);
        
        $categoria = $categorialocal['categoria'];
        
        
    }
    else {
        $idcategoriaLocal = '';
        $categoria = '';
        
        
    }

    
    //Obtenemos la accion a realizar
    $accion = $_GET['accion'];

?>

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
        <title>Administrar Categoria Local</title>
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
                        <h1 class="titulo"><?php echo (!$idcategoriaLocal ? 'Nuevo' : 'Edición de ') ?> Categoria Local</h1>
                        <form id="formArticulo" name="formArticulo" method = "post" class="abmForm"  action="../../../negocio/categorialocal.php">
                            <fieldset>
                                <legend>Datos de Categoria Local</legend>
                                <span class="textoInformativo">Los campos con asterisco(*), son obligatorios</span>
                                <p>
                                    <label class="left">idcategoriaLocal:</label>
                                    <input type="text" id="idcategoriaLocal" name="idcategoriaLocal" class="textoLargo"  readonly="readonly" value="<?php echo $idcategoriaLocal; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                                <p>
                                    <label class="left">categoria:</label>
                                    <input type="text" id="categoria" name="categoria" class="textoLargo" value="<?php echo $categoria; ?>" <?php echo ($accion == 'eliminar' ? 'readonly="readonly"' : ''); ?>/>
                                    
                                </p>
                               
                            </fieldset>
                            <div class="botones">
                                <p>
                                    <input type="submit" id="btnAceptar" name="btnAccion" value="<?php echo ($accion != 'eliminar' ? 'Actualizar' : 'Eliminar'); ?>" class="boton <?php echo ($accion != 'eliminar' ? 'aceptar' : 'eliminar'); ?>" <?php echo ($accion == 'eliminar' ? 'onclick="return confirm(\'¿Confirma eliminación?\');"' : ''); ?>  />                
                                    <input onclick="window.history.go(-1);" type="button" id="btnCancelar" name="accion" value="Cancelar" class="boton cancelar"/>
                                    <input type="hidden" id="idcategoriaLocal" name="idcategoriaLocal" value="<?php echo $idcategoriaLocal ?>"/>
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