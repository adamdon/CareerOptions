<?php
    $servername = "localhost";
    $username = "root";
    $password="";
    $dbname="hostel";


    try
    {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "Connected successfully <br />";
    }
    catch(PDOException $e)
    {
        echo "Connection failed: " . $e->getMessage();
    }

    $query=$conn->prepare("CREATE TABLE surveys (id int(6) NOT NULL
    auto_increment,first varchar(15) NOT NULL,last varchar(15) NOT
    NULL,email varchar(30) NOT NULL,transport varchar(10) NOT NULL, published BOOLEAN NOT NULL,PRIMARY
    KEY (id),UNIQUE id (id),KEY id_2 (id))");

    $query->execute();
    $conn = null;




?>