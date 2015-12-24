<?php
$servername = "127.0.0.1";
$username = "root";
$pass = "Magnitude_9";

$db = mysqli_connect($servername, $username, $pass, "fam");

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
} 
//echo "Connected successfully";
// print_r($_GET);
if ($_GET["action"] == "getNames") {
	$res = $db->query("SELECT * FROM people WHERE isPicked <> 1");
} else if ($_GET["action"] == "updateName") {
	$res = $db->query("UPDATE people SET isPicked = 1 WHERE id = " . $_GET["uid"]);
}

if (!$res) {
    echo "DB Error, could not query the database\n";
    echo 'MySQL Error: ' . mysql_error();
    exit;
}

$rows = array();
while ($row = $res->fetch_assoc()) {  

   $rows[] = $row;
}

echo json_encode($rows);
?>