<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

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

	// Setting query to get items
	$sql = "SELECT CategoryID, CategoryName FROM categories";

	// Obtaining results
	$results = $GLOBALS['conn']->query($sql);

	
	// Create an array variable to store data
	$rows = array();

	// Store the result as array of objects
	while ($rs = $results->fetch_array(MYSQLI_ASSOC)) {
		$sql = "";
		$sql = "SELECT ItemID FROM items WHERE CategoryID = " .$rs[CategoryID];
		$results2 = $GLOBALS['conn']->query($sql);
		if (($results2->num_rows)>0) {
			$rows[] = $rs;
		}
	}

	// Close result sets
	$results2->close();
	$results->close();
	
	// Closing database connection
	$conn->close();

	// Returning the result
	echo json_encode($rows);
?>