<?php
    if(!defined('BASE_PATH')) {
        require_once('../comun/configuracion.php');
    }

    require_once(BASE_PATH .DS. 'datos' .DS. 'dEdificio.php');

    $dbEdifcio = new Edificio();

    $idedificio = isset($_POST['idedificio']) && (int)$_POST['idedificio'] > 0 ? (int)$_POST['idedificio'] : '';

    $direccion = isset($_POST['direccion']) ? $_POST['direccion'] : '';

    $tamanio = isset($_POST['tamanio']) ? $_POST['tamanio'] : '';

    $piso = isset($_POST['piso']) ? $_POST['piso'] : '';




    

    $btnAccion = isset($_POST['btnAccion']) ? $_POST['btnAccion'] : '';
     


    if($btnAccion == 'Actualizar') {
        echo $idedificio;
        echo $btnAccion;
        // SI NO hay idedificio => Estamos AGREGANDO (INSERT)
        if($idedificio==''){
            $valores = array(
                $direccion,
                $tamanio,
                $piso
            );
                
            $dbEdifcio->insertarEdifico($valores);
        }
        // Caso contrario estamos ACTUALIZANDO (UPDATE)
        else{
            $valores = array(
                $direccion,
                $tamanio,
                $piso,
                $idedificio

            );
           
            $dbEdifcio->actualizarEmpleado($valores);
        }
    }
    else {
            $condicion = " idedificio = '" .$idedificio. "'";
            $dbEdifcio->eliminar($condicion);

    }
    
    header("Location:../vista/abm/edifcio/administrarEdifcio.php");
?>