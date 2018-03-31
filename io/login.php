<?php
$servername = "pathfound.ca";
$username = "pathfound";
$password = "toaster100";

$usernameInput = $_POST['user'];
$userPasswordInput = $_POST['password'];

// Create connection
$conn = new mysqli($servername, $username, $password, "testbasepathfound");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT userPassword FROM User WHERE userName = '" . $usernameInput . "' AND userPassword = '" . $userPasswordInput . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo true;
    }
} else {
    echo "0 results";
}
$conn->close();

?>