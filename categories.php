<?php
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

  	$selectedCategory = $_REQUEST["selectedCategory"];
  	
  	//old echo used with ajax
  	//echo "<h2>You've entered into " . $selectedCategory . " page!<h2>";

  	$servername = "localhost";
  	$username = "root";
  	$password = "37cdg3s5";
  	$dbname = "gulruz";
  	$categoryID = 0;

  	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_errno) {
    	die("Connection failed: " .$conn->connect_error);
        exit();
	}

	switch ($selectedCategory) {
	  	case 'paynet':
	  		$categoryID = 5;
	  		break;

	  	case 'gifts':
	  		$categoryID = 1;
	  		break;

	  	case 'chocolate':
	  		chocolateDB();
	  		break;

	  	case 'flowers':
	  		flowersDB();
	  		break;

	  	case 'parfume':
	  		parfumeDB();
	  		break;

	  	case 'beauty':
	  		beautyDB();
	  		break;
	  	
	  	default:
	  		# code...
	  		break;
	}

	$sql = "SELECT ItemID, Title, Price FROM items WHERE CategoryID = " .$categoryID;
	$result = $GLOBALS['conn']->query($sql);

	while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	  	if ($jsonResult != "") {$jsonResult .= ",";}
	  		$jsonResult .= '{"ItemID":"' 	.$rs[ItemID]	.'",';
	  		$jsonResult .= '"CategoryID":"'	.$categoryID	.'",';
	  		$jsonResult .= '"Title":"' 		.$rs["Title"]	.'",';
	  		$jsonResult .= '"Price":"'		.$rs[Price]	.'"}';
	  	}
	$jsonResult = '{"records":['.$jsonResult.']}';
	  		
	echo ($jsonResult);

	  	//This is old paynetDB function for ajax use only
	  	/*function paynetDB()
	  	{
	  		$sql = "SELECT PaynetItemID, Name, Price FROM " .$GLOBALS['selectedCategory'];
	  		$result = mysqli_query($GLOBALS['conn'], $sql);

	  		if (mysqli_num_rows($result) > 0) {
          		// output data of each row
          		echo '<div class="btn-group btn-group-justified" data-toggle="buttons" aria-label="...">';
          		while($row = mysqli_fetch_assoc($result)) {
        			$count+=1;
        			if ($count == 5) {
        				echo '</div><br>';
        				echo '<div class="btn-group btn-group-justified" data-toggle="buttons" aria-label="...">';
        				$count = 1;
        			}
        			echo '<label class="btn btn-success" role="group">';
        			echo '<input type="radio" name="options" autocomplete="off" id="' .$row["PaynetItemID"] .'" class="btn btn-success"><span class="glyphicon glyphicon-usd" aria-hidden="true"></span>' .$row["Price"] .'</input>';
        			echo '</label>';
            		//echo "id: " . $row["id"]. " - Name: " . $row["name"]. " " . $row["price"]. "<br>";
    	  		}
    	  		echo '</div>';
	    	} else {
    	  		echo "0 results";
	    	}
	  	}*/

	  	function paynetDB()
	  	{
	  		
	  	}

	  	function giftsDB($value='')
	  	{
	  		$sql = "SELECT GiftsID, Name, Price FROM " .$GLOBALS['selectedCategory'];
	  		$result = $GLOBALS['conn']->query($sql);

	  		
	  		while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	  			if ($jsonResult != "") {$jsonResult .= ",";}
	  			$jsonResult .= '{"ID":"' 	.$rs["GiftsID"]	.'",';
	  			$jsonResult .= '"Name":"' 	.$rs["Name"]			.'",';
	  			$jsonResult .= '"Price":"'	.$rs["Price"]			.'"}';
	  		}
	  		$jsonResult = '{"records":['.$jsonResult.']}';
	  		
	  		
	  		echo ($jsonResult);
	  	}

	  	function chocolateDB($value='')
	  	{
	  		echo "chocolate";
	  	}

	  	function flowersDB($value='')
	  	{
	  		echo "flowers";
	  	}

	  	function parfumeDB($value='')
	  	{
	  		echo "parfume";
	  	}

	  	function beautyDB($value='')
	  	{
	  		echo "beauty";
	  	}
	  

	  	$conn->close();

	  //PDO with itiration connection:
  	  /*try {
    	$conn = new PDO("mysql:host=$servername;dbname=paynet", $username, $password);
    	// set the PDO error mode to exception
    	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	$stmt = $conn->prepare("SELECT * FROM items");
    	$stmt->execute();

    	// set the resulting array to associative
    	$result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    	foreach(new TableRows(new RecursiveArrayIterator($stmt->fetchAll())) as $k=>$v) { 
        	echo $v;
    	}

   	 	echo "Connected successfully"; 
      }
	  catch(PDOException $e) {
    	echo "Connection failed: " . $e->getMessage();
      }

      $conn = null;*/
?>