<?php
	header("Access-Control-Allow-Origin: *");

	// Request or receive data
	$data = $_REQUEST;

	// Filter received data
	foreach ($data as $key => $value) {
		if ($key == "payer" || $key == "receiver") {
			$value = testInput($value);
		}
	}

	// Filtering function to filter
	function testInput($data)
	{
		$data = trim($data);
  		$data = stripslashes($data);
  		$data = htmlspecialchars($data);
  		$data = filter_var($data, FILTER_SANITIZE_STRING, FILTER_FLAG_STRIP_HIGH);
  		return $data;
	}

	// Database access info
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

	$outp = print_r($data, true);
	// foreach ($orderInformation as $key => $value) {
	// 	$outp = $key . "=" . $value;
	// }
	$myfile = fopen("testfile.txt", "w");
	fwrite($myfile, $outp);
	fclose($myfile);

?>