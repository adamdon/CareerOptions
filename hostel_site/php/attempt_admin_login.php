<?php

$connectionPdo = null;
$query = null;
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel";

$jsonResults = null;

$firstname = $_POST["var1Text"];
$lastname = $_POST["var2Text"];


try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}

$query=$connectionPdo->prepare("SELECT * FROM logins");
$query->execute();


$results=$query->fetchAll(PDO::FETCH_ASSOC);
$jsonResults = json_encode($results);

echo $jsonResults;




$connectionPdo = null;
?>