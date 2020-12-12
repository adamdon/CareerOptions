<?php

$connectionPdo = null;
$query = null;

$servername = "localhost";
$databaseName="careeroptions";

$username = "root";
$password="";

$first = null;
$last = null;
$email = null;
$message = null;
$share = null;





try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$databaseName", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $first = "John";
    $last = "Doe";
    $email = "JonnyDoe@email.com";
    $message = "Love this site, keep up the good work";
    $share = true;




    $query=$connectionPdo->prepare("INSERT INTO contact (first, last, email, message, share) VALUES (?,?,?,?,?)");

    $query->bindParam(1, $first);
    $query->bindParam(2, $last);
    $query->bindParam(3, $email);
    $query->bindParam(4, $message);
    $query->bindParam(5, $share);
    $query->execute();
}
catch(PDOException $PDOException)
{
    echo $PDOException->getCode();
    exit();
}



$connectionPdo = null;
?>