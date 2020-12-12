<?php
$connectionPdo = null;
$query = null;

$servername = "localhost";
$databaseName="careeroptions";

$username = "root";
$password="";



try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $PDOException)
{
    echo ($PDOException->getCode() . "Connection failed: " . $PDOException->getMessage());
}


$query


?>