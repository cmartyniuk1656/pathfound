<?php
$servername = "pathfound.ca";
$username = "pathfound";
$password = "toaster100";

// Create connection
$conn = new mysqli($servername, $username, $password, "testbasepathfound");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT userName, userPassword FROM User";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "User Name: " . $row["userName"]. "Password: ". $row["userPassword"]. "<br>";
    }
} else {
    echo "0 results";
}
$conn->close();

?>