<?php
    if(!defined('BASE_PATH')){//Comprueba si no existe dicha constante
        require_once('../comun/configuracion.php');//Si no existe, incluyo el archivo que define dicha constante
    }
    require_once(BASE_PATH . DS . 'datos' . DS . 'comun' . DS .'BaseDatos.php');



    class Edifcio extends BaseDatos{
        
        function __construct()
        {
            parent::__construct();
            
            $this->nombreTabla = 'Edifcio';
        }


        public function insertarEdifico($valores) {
            $consulta = "
                        INSERT INTO edifico (
                            idedifico,
                            dni
                            horarioEntrada,
                            horarioSalida,
                            telefono,
                            edificio_idedificio
                            )
                        VALUES (?, ?, ?, ?, ?, ?);";
            $insert = $this->db->prepare($consulta);
            return $insert->execute($valores);
        }


        public function actualizarEmpleado($valores){
            $consulta = "
                UPDATE empleados SET 
                    nombre = ?,
                    dni = ?,
                    horarioEntrada = ?,
                    horarioSalida = ?,
                    telefono = ?,
                    edificio_idedificio = ?
                WHERE  idempleados = ?";
            
            $insert = $this->db->prepare($consulta);
            
            return $insert->execute($valores);
        }

        public function listarEmpleados($ordenarPor = '', $desde = 0, $cantidad = 10){
            $consulta = "
            SELECT idempleados, 
                    nombre, 
                    dni, 
                    horarioEntrada AS entrada, 
                    horarioSalida AS salida, 
                    telefono, 
                    edificio_idedificio AS  edificio
            FROM empleados ".
            ($ordenarPor ? " ORDER BY " .$ordenarPor. " LIMIT " .$desde. ", ".$cantidad : "" ). ";";
            $select = $this->db->prepare($consulta);
            $select->execute();
            return $select->fetchAll(PDO::FETCH_ASSOC);
        }



    }



?>