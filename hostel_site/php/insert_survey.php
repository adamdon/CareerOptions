<?php

$connectionPdo = null;
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hostel";






$first = null;
$last = null;
$email = null;
$share = null;
$message = null;





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



$query=$connectionPdo->prepare("INSERT INTO surveys (first, last, email, transport, published) VALUES (?,?,?,?,?)");

$query->bindParam(1, $first);
$query->bindParam(2, $last);
$query->bindParam(3, $email);
$query->bindParam(4, $transport);
$query->bindParam(5, $published);

$query->execute();
$connectionPdo = null;



echo 'Hi '.$_POST['first'].' ' .$_POST['last'] .' thanks for doing the survey.</br>';
echo 'Email inputted: '. $_POST['email'].' .</br>';
echo 'Transport inputted: '. $_POST['transport'].' .</br>';
echo 'Published permission inputted: '. $_POST['published'].' .</br>';

echo '<a href="../index.html">Go back to Home Page</a>';




?>