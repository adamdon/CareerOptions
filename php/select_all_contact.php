<?php

$servername = "localhost";
$databaseName = "careeroptions";

$username = "root";
$password = "";

$connectionPdo = null;
$query = null;

$outputMessageArray = [];

try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $PDOException)
{
    echo ($PDOException->getCode());
    exit();
}




$query=$connectionPdo->prepare("SELECT * FROM contact");
$query->execute();
$results=$query->fetchAll(PDO::FETCH_ASSOC);




foreach ($results as $row)
{
    if($row['share'] == true)
    {
        array_push($outputMessageArray, $row['message']);
    }
}
echo json_encode($outputMessageArray);
//echo json_encode($results); //for all results






$connectionPdo = null;
?>