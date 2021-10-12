<?php
require_once(BASE_PATH . DS. 'datos' . DS . 'comun' . DS . 'SPDO.php');

class BaseDatos {
    protected $db;
    var $nombreTabla;

    public function __construct() {
        $this->db = SPDO::singleton();
        
        //$this->db->exec("SET CHARACTER SET utf8");
        $this->db->exec("SET NAMES 'utf8'");
        
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        
        // Configuramos para que las consultas devuelvan SÓLO vectores asociativos
        $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    public function seleccionarTodos($ordenarPor = '', $limitar = null, $desde = 0, $cantidad = 10){
        $desde = (int)$desde ? (int)$desde : 0;
        $cantidad = (int)$cantidad ? (int)$cantidad : 10;
        
        $consulta = "
            SELECT *
            FROM " .$this->nombreTabla.
            ($ordenarPor ? " ORDER BY " .$ordenarPor : "").
            ($limitar ? " LIMIT " .$desde.", ".$cantidad : "" ). ";";
        $select = $this->db->prepare($consulta);
        /*var_dump($consulta);
        die();*/
        $select->execute();
        return $select->fetchAll();
    }

    public function seleccionarFila($condicion){
        $consulta = "
            SELECT *
            FROM ".$this->nombreTabla."
            WHERE ".$condicion.";";
        $select = $this->db->prepare($consulta);
        $select->execute();
        return $select->fetch();
    }
    
   
    public function eliminar($condicion){
        $consulta = "
            DELETE
            FROM ".$this->nombreTabla."
            WHERE ".$condicion.";";
        $delete = $this->db->prepare($consulta);
        $delete->execute();
        return $delete;
    }
   
    public function ejecutar($consulta){
        $resultado = $this->db->prepare($consulta);
        $resultado->execute();
        return $resultado->fetchAll();;
    }
    
    public function deshabilitar($condicion){
        $consulta = "
            UPDATE ".$this->nombreTabla." SET
                deshabilitado = 1
            WHERE ".$condicion. ";";
        $insert = $this->db->prepare($consulta);
        $insert->execute();
        return $insert;
    }
    
    public function habilitar(){
    }
    
}
?>