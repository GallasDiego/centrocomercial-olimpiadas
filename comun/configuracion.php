<?php
// Definimos una constante para la barra separadora de directorios, ya que es diferente en c/ S.O.
define('DS', DIRECTORY_SEPARATOR);

// Definimos una constante para la RUTA/PATH de la aplicacion en el disco
define('BASE_PATH', dirname(dirname(__FILE__)));

require_once(BASE_PATH . DS. 'comun' . DS . 'Config.php');

// Instanciamos la clase 'Config' en el objeto $config
$config = Config::singleton();

/* ------ Definimos los datos de conexion ------ */

// Tipo de DB: mysql, sqlite, postgresql, etc
$config->set('dbtype', 'mysql');

// Direccion del servidor de SQL (en este caso localhost o 127.0.0.1, pero puede ser otro socket IP:puerto ej: 170.2.1.4:3306) 
$config->set('dbhost', 'localhost');

// Nombre de la Base de Datos
$config->set('dbname', 'centrocomercial');

// Nombre de usuario con los privilegios para "utilizar" la Base de Datos
$config->set('dbuser', 'root');

// Password de usuario con los privilegios para "utilizar" la Base de Datos
$config->set('dbpass', '');

// Config para sqlite
// $config->set('dbpath', '/tmp/foo.db');
// Ruta del directorio donde se guardaran las copias/backups
$config->set('dirBackUps', BASE_PATH .DS. 'copias' .DS);

// Nombre de la carpeta, dentro del www del wamp, en donde se instala el sistema. Por ej: C:\wamp\www\ventas  -> en este caso ventas
$config->set('dirBase', 'centrocomercial');

define('BASE_URL', 'http://'.$_SERVER['HTTP_HOST'].'/'.$config->get('dirBase'));

?>
