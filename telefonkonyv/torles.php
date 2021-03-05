<?php
require './MySqlDB.php';
$mySql = new MySqlDB();
if($_SERVER['REQUEST_METHOD']==="DELETE"){
$mySql->torol("telefonkonyvem", "ID=".$_GET["ID"]);
}