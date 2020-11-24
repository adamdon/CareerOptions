<?php

$connectionPdo = null;
$query = null;
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel";


try
{
    $connectionPdo = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $connectionPdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully <br />";
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}

$query=$connectionPdo->prepare("SELECT * FROM surveys");
$query->execute();


$results=$query->fetchAll(PDO::FETCH_ASSOC);
foreach ($results as $row)
{
    echo $row['first'] . "<br />";
    echo $row['last'] . "<br />";
    echo $row['email'] . "<br />";
    echo $row['transport'] . "<br />";
    echo $row['published'] . "<br />";
    echo "<hr />";
}


$connectionPdo = null;
?>