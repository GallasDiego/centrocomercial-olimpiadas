<?php
    if(!defined('BASE_PATH')) {
        require_once('../comun/configuracion.php');
    }

    require_once(BASE_PATH .DS. 'datos' .DS. 'dEmpledos.php');

    $dbEmpleados = new Empleados();

    $idempleados = isset($_POST['idempleados']) && (int)$_POST['idempleados'] > 0 ? (int)$_POST['idempleados'] : '';

    $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
    $dni = isset($_POST['dni']) ? $_POST['dni'] : '';
    $horarioEntrada = isset($_POST['horarioEntrada']) ? $_POST['horarioEntrada'] : '';
    $horarioSalida = isset($_POST['horarioEntrada']) ? $_POST['horarioEntrada'] : '';
    $telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';
    $edificio_idedificio = isset($_POST['edificio_idedificio']) && (int)$_POST['edificio_idedificio'] > 0 ? (int)$_POST['edificio_idedificio'] : '';


    

    $btnAccion = isset($_POST['btnAccion']) ? $_POST['btnAccion'] : '';
     


    if($btnAccion == 'Actualizar') {
        echo $idempleados;
        echo $btnAccion;
        // SI NO hay idempleados => Estamos AGREGANDO (INSERT)
        if($idempleados==''){
            $valores = array(
                $nombre,
                $dni,
                $horarioEntrada,
                $horarioSalida,
                $telefono,
                $edificio_idedificio
            );
                
            $dbEmpleados->insertarEmpleado($valores);
        }
        // Caso contrario estamos ACTUALIZANDO (UPDATE)
        else{
            $valores = array(
                $nombre,
                $dni,
                $horarioEntrada,
                $horarioSalida,
                $telefono,
                $edificio_idedificio,
                $idempleados

            );
            $dbEmpleados->actualizarEmpleado($valores);
        }
    }
    else {
            $condicion = " idempleados = '" .$idempleados. "'";
            $dbEmpleados->eliminar($condicion);

    }
    
    header("Location:../vista/abm/empleados/administrarEmpleados.php");
?>