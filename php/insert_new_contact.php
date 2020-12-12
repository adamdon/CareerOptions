<?php
$connectionPdo = null;
$query = null;

$servername = "localhost";
$databaseName = "careeroptions";

$username = "root";
$password = "";


$first = null;
$last = null;
$email = null;
$message = null;
$share = null;




//echo var_dump($_POST['shareInput']);

try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $PDOException)
{
    if($PDOException->getCode() == 1049) // check for SQLSTATE[HY000] [1049] Unknown database
    {
        include 'create_database_contact.php'; //make careeroptions database
        include 'create_table_contact.php'; // make contact table in new database
        include "insert_default_contact.php"; //Adding test data to new table
    }
}




try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


    $query=$connectionPdo->prepare("INSERT INTO contact (first, last, email, message, share) VALUES (?,?,?,?,?)");


    $first = $_POST['firstInput'];
    $last = $_POST['lastInput'];;
    $email = $_POST['emailInput'];;
    $message = $_POST['messageInput'];;
    if (isset($_POST['shareInput']))
    {
        $share = true;
    }
    else
    {
        $share = false;
    }
    $query->bindParam(1, $first);
    $query->bindParam(2, $last);
    $query->bindParam(3, $email);
    $query->bindParam(4, $message);
    $query->bindParam(5, $share);
    $query->execute();
}
catch(PDOException $PDOException)
{
    echo ($PDOException->getCode());
}









?>