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
    echo "Database created successfully<br>";
    echo "Hello world!";
    include 'create_table_contact.php';

}
catch(PDOException $e)
{
    echo $sqlStatement . "<br>" . $e->getMessage();
}

//function createTableContact()
//{
//
//}





$connectionPdo = null;
?>