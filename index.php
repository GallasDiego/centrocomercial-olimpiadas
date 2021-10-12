<?php
    require_once('comun/configuracion.php');
    require_once('vista/comun/modulos.php');
    $modulos = Modulos::getInstanceSingleton();
?>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
    <title>Administración de Articulos</title>
    <link type="text/css" href="vista/css/estilos.css" rel="stylesheet"></link>
</head>
<body>
    <div id="envolturaPrincipal" class="envoltura">
	<div id="top">
            <div id="logo1" class="logo"></div>
            <div id="cabecera">
                <div id="menuNavegacion" class="envoltura">
                    <?php $modulos->incluirModulo('menu'); ?>
                     <div class="cleareone"> </div>   
                </div>
            </div>
            <div id="logo2" class="logo"></div>
    </div>
        <div id="envolturaContenido" class="envoltura">
            <div id="contenidoPrincipal">
                <div class="relleno">

                </div>
            </div>
        </div>
		 <div id="piePagina">
                <?php $modulos->incluirModulo('piePagina'); ?>
        </div>
    </div>
</body>
</html>