<?php

 
    require_once('../../../comun/configuracion.php');
    require_once( BASE_PATH . DS . 'datos' . DS . 'dEmpledos.php');
    require_once('../../comun/modulos.php');
    $dbEmpleado = new Empleados();
    $empleados = $dbEmpleado->listarEmpleados('nombre',0,999);
    $modulos = Modulos::getInstanceSingleton();
?>


<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
        <title>Administración de Empleados</title>
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
                        <h1 class="titulo">Administrar Empleados</h1>
                        <p><a href="editarEmpleado.php?accion=nuevo" class="nuevo"><span>Nuevo Empleado</span><img src="../../img/nuevo.png" title="Nuevo"/></a></p>
                        <table class="tablaListado">
                            <thead>
                                <tr>
                                    <th>IdEmpleado</th>
                                    <th>Nombre</th>
                                    <th>D.N.I.</th>
                                    <th>Entrada</th>
                                    <th>Salida</th>
                                    <th>Telefono</th>
                                    <th>Edificio</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php
                            $i = 1;
                            $clase = '';
                            foreach($empleados as $fila ){
                                $clase = $i%2 ? 'par' : 'impar';
                                echo '<tr class="'.$clase.'">';
                                    echo '<td>'.$fila['idempleados'].'</td>';
                                    echo '<td>'.$fila['nombre'].'</td>';
                                    echo '<td>'.$fila['dni'].'</td>';
                                    echo '<td>'.$fila['entrada'].'</td>';
                                    echo '<td>'.$fila['salida'].'</td>';
                                    echo '<td>'.$fila['telefono'].'</td>';
                                    echo '<td>'.$fila['edificio'].'</td>';
                                    
                                    echo '<td class="iconCenter">
                                            <a href="editarEmpleado.php?idempleados='.$fila['idempleados'].'&accion=editar"><img src="../../img/ver.gif" title="Editar""/></a> &nbsp;&nbsp;
                                            
                                            <a href="editarEmpleado.php?accion=eliminar&idempleados='.$fila['idempleados'].'"><img src="../../img/eliminar.gif" title="Eliminar"/></a>
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