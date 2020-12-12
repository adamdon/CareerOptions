<?php
$connectionPdo = null;

$servername = "localhost";
$databaseName = "careeroptions";

$username = "root";
$password = "";

$sqlStatement = null;




try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $connectionPdo->prepare("CREATE TABLE contact (id int(6) NOT NULL
    auto_increment,first varchar(15) NOT NULL,last varchar(15) NOT
    NULL,email varchar(30) NOT NULL, message varchar(255) NOT NULL, share BOOLEAN NOT NULL,PRIMARY
    KEY (id),UNIQUE id (id),KEY id_2 (id))");

    $query->execute();
}
catch(PDOException $PDOException)
{
    echo $PDOException->getCode();
    exit();
}