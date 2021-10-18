<?php

 
    require_once('../../../comun/configuracion.php');
    require_once( BASE_PATH . DS . 'datos' . DS . 'dActividad.php');
    require_once('../../comun/modulos.php');
    $dbActividad = new Actividad();
    $actividad = $dbActividad->listarActividad('actividad',0,999);
    $modulos = Modulos::getInstanceSingleton();
?>


<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
        <title>Administración de Actividad</title>
        <link type="text/css" href="../../css/estilos.css" rel="stylesheet"></link>
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
                        <h1 class="titulo">Administrar Actividad</h1>
                        <p><a href="editarActividad.php?accion=nuevo" class="nuevo"><span>Nuevo Empleado</span><img src="../../img/nuevo.png" title="Nuevo"/></a></p>
                        <table class="tablaListado">
                            <thead>
                                <tr>
                                    <th>IdActividad</th>
                                    <th>Actividad</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php
                            $i = 1;
                            $clase = '';
                            foreach($actividad as $fila ){
                                $clase = $i%2 ? 'par' : 'impar';
                                echo '<tr class="'.$clase.'">';
                                    echo '<td>'.$fila['idactividad'].'</td>';
                                    echo '<td>'.$fila['actividad'].'</td>';

                                    
                                    echo '<td class="iconCenter">
                                            <a href="editarActividad.php?idactividad='.$fila['idactividad'].'&accion=editar"><img src="../../img/ver.gif" title="Editar""/></a> &nbsp;&nbsp;
                                            
                                            <a href="editarActividad.php?accion=eliminar&idactividad='.$fila['idactividad'].'"><img src="../../img/eliminar.gif" title="Eliminar"/></a>
                                        </td>';
                                    echo '</tr>';
                                $i++;
                            }
                            ?>
                            </tbody>      
                        </table>
                    </div>
                </div>
            </div>
            <div id="piePagina">
                <?php $modulos->incluirModulo('piePagina'); ?>
            </div>
        </div>
    </body>
</html>