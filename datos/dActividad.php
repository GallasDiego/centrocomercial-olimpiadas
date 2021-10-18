<?php
    if(!defined('BASE_PATH')){//Comprueba si no existe dicha constante
        require_once('../comun/configuracion.php');//Si no existe, incluyo el archivo que define dicha constante
    }
    require_once(BASE_PATH . DS . 'datos' . DS . 'comun' . DS .'BaseDatos.php');



    class Actividad extends BaseDatos{
        
        function __construct()
        {
            parent::__construct();
            
            $this->nombreTabla = 'Actividad';
        }


        public function insertarActividad($valores) {
            $consulta = "
                        INSERT INTO actividad (
                            actividad
                            )
                        VALUES (?);";
            $insert = $this->db->prepare($consulta);
            return $insert->execute($valores);
        }


        public function actualizarActividad($valores){
            $consulta = "
                UPDATE actividad SET 
                    actividad = ?
                WHERE  idactividad = ?";
            
            $insert = $this->db->prepare($consulta);
            
            return $insert->execute($valores);
        }

        public function listarActividad($ordenarPor = '', $desde = 0, $cantidad = 10){
            $consulta = "
            SELECT 
            idactividad ,
            actividad
            FROM actividad ".
            ($ordenarPor ? " ORDER BY " .$ordenarPor. " LIMIT " .$desde. ", ".$cantidad : "" ). ";";
            $select = $this->db->prepare($consulta);
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        }



    }



?>