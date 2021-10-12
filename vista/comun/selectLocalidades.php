<?php
    require_once('../../comun/configuracion.php');
    require_once( BASE_PATH . DS . 'datos' . DS . 'Localidad.php');
    
    $IDProvincia = isset($_REQUEST['IDProvincia']) && (int)$_REQUEST['IDProvincia'] > 0 ? (int)$_REQUEST['IDProvincia'] : 0;
    $IDLocalidad = isset($_REQUEST['IDLocalidad']) && (int)$_REQUEST['IDLocalidad'] > 0 ? (int)$_REQUEST['IDLocalidad'] : 0;
    $dbLocalidad = new Localidad();
    $localidades = $dbLocalidad->seleccionarLocalidades('nombre', $IDProvincia);
?>
<option value="">&nbsp;</option>
<?php
    foreach($localidades as $loc)
    echo '<option value="'.$loc['IDLocalidad'].'" '.((int)$IDLocalidad == (int)$loc['IDLocalidad'] ? 'selected="selected"' : '').'>'.$loc['nombre'].'</option>';
?>