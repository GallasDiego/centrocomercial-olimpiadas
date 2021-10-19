<?php
    if(!defined('BASE_PATH')){//Comprueba si no existe dicha constante
        require_once('../comun/configuracion.php');//Si no existe, incluyo el archivo que define dicha constante
    }
    require_once(BASE_PATH . DS . 'datos' . DS . 'comun' . DS .'BaseDatos.php');



    class Categorialocal extends BaseDatos{
        
        function __construct()
        {
            parent::__construct();
            
            $this->nombreTabla = 'categorialocal';
        }


        public function insertarCategoriaLocal($valores) {
            $consulta = "
                        INSERT INTO categorialocal (
                            categoria
                            )
                        VALUES (?);";
            $insert = $this->db->prepare($consulta);
            return $insert->execute($valores);
        }


        public function actualizarCategoriaLocal($valores){
            $consulta = "
                UPDATE categorialocal SET 
                    categoria = ?
                WHERE  idcategoriaLocal = ?";
            
            $insert = $this->db->prepare($consulta);
            
            return $insert->execute($valores);
        }

        public function listarCategoriaLocal($ordenarPor = '', $desde = 0, $cantidad = 10){
            $consulta = "
            SELECT 
            idcategoriaLocal ,
            categoria
            FROM categorialocal ".
            ($ordenarPor ? " ORDER BY " .$ordenarPor. " LIMIT " .$desde. ", ".$cantidad : "" ). ";";
            $select = $this->db->prepare($consulta);
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        }



    }



?>