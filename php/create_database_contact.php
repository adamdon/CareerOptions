<?php
$connectionPdo = null;

$servername = "localhost";
$databaseName = "careeroptions";

$username = "root";
$password = "";

$sqlStatement = "";

try
{
    $connectionPdo = new PDO("mysql:host=$servername", $username, $password);

    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlStatement = ("CREATE DATABASE " . $databaseName);

    // use exec() because no results are returned
    $connectionPdo->exec($sqlStatement);

}
catch(PDOException $e)
{
    echo $e->getCode();
    exit();
}

//function createTableContact()
//{
//
//}





$connectionPdo = null;
?>