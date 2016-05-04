<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

  	$selectedCategory = $_REQUEST;

  	$servername = "localhost";
  	$username = "root";
  	$password = "admin";
  	$dbname = "gulruz";

  	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_errno) {
    	die("Connection failed: " .$conn->connect_error);
        exit();
	}
	define('CategoryID', 'CategoryID');
	// Setting query to get items
	$sql = "SELECT ItemID, CategoryID, Title, Price FROM items WHERE CategoryID = " .$selectedCategory[CategoryID];
	$result = $GLOBALS['conn']->query($sql);

	$jsonResult = array();
	while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	  	// if ($jsonResult != "") {$jsonResult .= ",";}
	  	// $jsonResult .= '{"ItemID":"' 	.$rs[ItemID]	.'",';
	  	// $jsonResult .= '"CategoryID":"'	.$rs[CategoryID]	.'",';
	  	// $jsonResult .= '"Title":"' 		.$rs[Title]	.'",';
	  	// $jsonResult .= '"Price":"'		.$rs[Price]	.'"}';
	  	$jsonResult[] = $rs;
	}
	// $jsonResult = '{"records":['.$jsonResult.']}';
	$result->close();
	$conn->close();
	echo json_encode($jsonResult);
	// echo ($jsonResult);
?>