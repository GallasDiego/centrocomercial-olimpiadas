<?php
// Clase para instanciar SOLO UN objeto, e ir guardando parametros de configuracion
class Config {
    private $vars;
    private static $instance;
 
    private function __construct() {
        $this->vars = array();
    }
    
    //Con set vamos guardando nuestras variables.
    public function set($name, $value) {
        if(!isset($this->vars[$name])) {
            $this->vars[$name] = $value;
        }
    }
    
    //Con get('nombre_de_la_variable') recuperamos un valor.
    public function get($name) {
        if(isset($this->vars[$name])) {
            return $this->vars[$name];
        }
    }
    
    // Devolvemos la UNICA instancia de la clase (ver modelo SINGLETON)
    // http://es.wikipedia.org/wiki/Singleton
    public static function singleton() {
        if( self::$instance == null )
            self::$instance = new self();
        return self::$instance;
    }
}
/*
 Uso:
 
 $config = Config::singleton();
 $config->set('nombre', 'Federico');
 echo $config->get('nombre');
 
 $config2 = Config::singleton();
 echo $config2->get('nombre');
 
*/
?>
