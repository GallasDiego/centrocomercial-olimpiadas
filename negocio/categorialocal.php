<?php
    if(!defined('BASE_PATH')) {
        require_once('../comun/configuracion.php');
    }

    require_once(BASE_PATH .DS. 'datos' .DS. 'dcategorialocal.php');

    $dbCategorialocal = new Categorialocal();

    $idcategoriaLocal = isset($_POST['idcategoriaLocal']) && (int)$_POST['idcategoriaLocal'] > 0 ? (int)$_POST['idcategoriaLocal'] : '';

    $categoria = isset($_POST['categoria']) ? $_POST['categoria'] : '';
    


    

    $btnAccion = isset($_POST['btnAccion']) ? $_POST['btnAccion'] : '';
     


    if($btnAccion == 'Actualizar') {
        echo $idcategoriaLocal;
        echo $btnAccion;
        // SI NO hay idcategoriaLocal => Estamos AGREGANDO (INSERT)
        if($idcategoriaLocal==''){
            $valores = array(
                $categoria
            );
                
            $dbCategorialocal->insertarCategoriaLocal($valores);
        }
        // Caso contrario estamos ACTUALIZANDO (UPDATE)
        else{
            $valores = array(
                $categoria,
                $idcategoriaLocal

            );
           
            $dbCategorialocal->actualizarCategoriaLocal($valores);
        }
    }
    else {
            $condicion = " idcategoriaLocal = '" .$idcategoriaLocal. "'";
            $dbCategorialocal->eliminar($condicion);

    }
    
    header("Location:../vista/abm/categorialocal/administrarCategorialocal.php");
?>