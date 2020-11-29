<?php


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel";


try
{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully <br />";
}
catch(PDOException $e)
{
    echo "Connection failed: " . $e->getMessage();
}

$query=$conn->prepare("INSERT INTO contacts (first, last, email, message) VALUES
(?,?,?,?)");
$query->bindParam(1, $first);
$query->bindParam(2, $last);
$query->bindParam(3, $email);
$query->bindParam(4, $message);
$first=$_POST['first'];
$last=$_POST['last'];
$email=$_POST['email'];
$message=$_POST['message'];
$query->execute();
$conn = null;

echo 'Hi '.$_POST['first'].' ' .$_POST['last'] .' thanks for your interest.</br>';
echo 'We will contact you at '. $_POST['email'].' soon.</br>';
echo 'We will contact you at '. $_POST['email'].' soon.</br>';
echo '<a href="../index.html">Go back to Home Page</a>';




?>