<?php
$connectionPdo = null;

$servername = "localhost";
$databaseName="careeroptions";

$username = "root";
$password="";



try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully <br />";
}
catch(PDOException $PDOException)
{
    if($PDOException->getCode() == 1049) // check for SQLSTATE[HY000] [1049] Unknown database
    {
        echo "UNKNOWN database btw1";
        include 'create_database_contact.php'; //make careeroptions database
        echo "UNKNOWN database btw2";
        include 'create_table_contact.php'; // make contact table
    }
    else
    {
        echo ($PDOException->getCode() . "Connection failed: " . $PDOException->getMessage());
    }

}


?>