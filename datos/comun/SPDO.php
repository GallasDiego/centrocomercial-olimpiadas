<?php
require_once(BASE_PATH . DS. 'comun' . DS . 'configuracion.php');

// Creamos la clase SPDO que hereda/extiende de la clase nativa de php PDO
// http://php.net/manual/es/book.pdo.php
class SPDO extends PDO {
    private static $instance = null;

    public function __construct() {
        $config = Config::singleton();
        
        // Armamos la cadena de conexion dependiendo del tipo de Base de Datos
        switch($config->get('dbtype')){
            case "mysql":
                $dbconn = 'mysql:host=' . $config->get('dbhost') . ';dbname=' . $config->get('dbname');
                break;
               
              case "sqlite":
                $dbconn = 'sqlite:' . $config->get('dbpath'); 
                break;
               
              case "postgresql":
                $dbconn = 'pgsql:host=' . $config->get('dbhost') . ';dbname=' . $config->get('dbname');
                break;
        }
        
        // Si sobre-escribimos el metodo del constructor,
        // se debe llamar al consructor padre del que extiende la clase
        parent::__construct($dbconn, $config->get('dbuser'), $config->get('dbpass'));
    }
    
    // Devolvemos la UNICA instancia de la clase (ver modelo SINGLETON)
    // http://es.wikipedia.org/wiki/Singleton
    public static function singleton() {
        if( self::$instance == null )
            self::$instance = new self();
        return self::$instance;
    }
    
    // http://php.net/manual/es/pdo.begintransaction.php
    function beginTransaction() {
        if(!$this->transactionCounter++)
            return parent::beginTransaction();
        return $this->transactionCounter >= 0;
    }

    function commit() {
        if(!--$this->transactionCounter)
            return parent::commit();
        return $this->transactionCounter >= 0;
    } 

    function rollback() {
        if($this->transactionCounter >= 0) {
            $this->transactionCounter = 0;
            return parent::rollback();
        }
        $this->transactionCounter = 0;
        return false;
    }
}
?>
