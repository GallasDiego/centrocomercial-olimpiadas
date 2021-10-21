<?php
    if(!defined('BASE_PATH')){//Comprueba si no existe dicha constante
        require_once('../comun/configuracion.php');//Si no existe, incluyo el archivo que define dicha constante
    }
    require_once(BASE_PATH . DS . 'datos' . DS . 'comun' . DS .'BaseDatos.php');



    class Edificio extends BaseDatos{
        
        function __construct()
        {
            parent::__construct();
            
            $this->nombreTabla = 'edificio';
        }


        public function insertarEdifico($valores) {
            $consulta = "
                        INSERT INTO edificio (
                            direccion,
                            tamanio,
                            piso
                            )
                        VALUES (?, ?, ?);";
            $insert = $this->db->prepare($consulta);
            return $insert->execute($valores);
        }


        public function actualizarEmpleado($valores){
            $consulta = "
                UPDATE edificio SET 
                    direccion = ?,
                    tamanio = ?,
                    piso = ?
                WHERE  idedificio = ?";
            
            $insert = $this->db->prepare($consulta);
            
            return $insert->execute($valores);
        }

        public function listarEdifcios($ordenarPor = '', $desde = 0, $cantidad = 10){
            $consulta = "
            SELECT idedificio, 
                    direccion, 
                    tamanio, 
                    piso 
            FROM edificio ".
            ($ordenarPor ? " ORDER BY " .$ordenarPor. " LIMIT " .$desde. ", ".$cantidad : "" ). ";";
            $select = $this->db->prepare($consulta);
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        }



    }



?>