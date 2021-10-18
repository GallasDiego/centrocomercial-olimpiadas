<?php
    if(!defined('BASE_PATH')) {
        require_once('../comun/configuracion.php');
    }

    require_once(BASE_PATH .DS. 'datos' .DS. 'dActividad.php');

    $dbActividad = new Actividad();

    $idactividad = isset($_POST['idactividad']) && (int)$_POST['idactividad'] > 0 ? (int)$_POST['idactividad'] : '';

    $actividad = isset($_POST['actividad']) ? $_POST['actividad'] : '';
    


    

    $btnAccion = isset($_POST['btnAccion']) ? $_POST['btnAccion'] : '';
     


    if($btnAccion == 'Actualizar') {
        echo $idactividad;
        echo $btnAccion;
        // SI NO hay idactividad => Estamos AGREGANDO (INSERT)
        if($idactividad==''){
            $valores = array(
                $actividad
            );
                
            $dbActividad->insertarActividad($valores);
        }
        // Caso contrario estamos ACTUALIZANDO (UPDATE)
        else{
            $valores = array(
                $actividad,
                $idactividad

            );
           
            $dbActividad->actualizarActividad($valores);
        }
    }
    else {
            $condicion = " idactividad = '" .$idactividad. "'";
            $dbActividad->eliminar($condicion);

    }
    
    header("Location:../vista/abm/actividad/administrarActividad.php");
?>