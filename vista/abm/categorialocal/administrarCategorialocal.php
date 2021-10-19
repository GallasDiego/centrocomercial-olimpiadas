<?php

 
    require_once('../../../comun/configuracion.php');
    require_once( BASE_PATH . DS . 'datos' . DS . 'dcategorialocal.php');
    require_once('../../comun/modulos.php');
    $dbCategorialocal = new Categorialocal();
    $categorialocal = $dbCategorialocal->listarCategoriaLocal('categoria',0,999);
    $modulos = Modulos::getInstanceSingleton();
?>


<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/> 
        <title>Administración de Categoria local</title>
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
                        <h1 class="titulo">Administrar Categoria local</h1>
                        <p><a href="editarCategorialocal.php?accion=nuevo" class="nuevo"><span>Nuevo Empleado</span><img src="../../img/nuevo.png" title="Nuevo"/></a></p>
                        <table class="tablaListado">
                            <thead>
                                <tr>
                                    <th>idcategoriaLocal</th>
                                    <th>Categoria local</th>
                                </tr>
                            </thead>
                            <tbody>
                            <?php
                            $i = 1;
                            $clase = '';
                            foreach($categorialocal as $fila ){
                                $clase = $i%2 ? 'par' : 'impar';
                                echo '<tr class="'.$clase.'">';
                                    echo '<td>'.$fila['idcategoriaLocal'].'</td>';
                                    echo '<td>'.$fila['categoria'].'</td>';

                                    
                                    echo '<td class="iconCenter">
                                            <a href="editarCategorialocal.php?idcategoriaLocal='.$fila['idcategoriaLocal'].'&accion=editar"><img src="../../img/ver.gif" title="Editar""/></a> &nbsp;&nbsp;
                                            
                                            <a href="editarCategorialocal.php?accion=eliminar&idcategoriaLocal='.$fila['idcategoriaLocal'].'"><img src="../../img/eliminar.gif" title="Eliminar"/></a>
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