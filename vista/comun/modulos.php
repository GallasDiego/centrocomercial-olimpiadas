


<?php
	class Modulos{
		static private $instance = null;
		private function __contruct() {}
		
		public static function getInstanceSingleton(){
        if (self::$instance == null){
            self::$instance = new Modulos();
        }
        return self::$instance;
		}
	
		function incluirModulo($modulo){
			if(is_file(BASE_PATH . DS . 'vista'. DS .'comun'. DS . 'modulos' . DS . $modulo . '.php')){
            	include_once('modulos/' . $modulo . '.php');
            }
            else{
            	echo 'HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
            }
		}
	}
?>