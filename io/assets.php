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


$dir = $_SERVER['DOCUMENT_ROOT'];
$intent = $_POST['intent'];
$fileName = $_POST['accUserName'];
$path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/avatar/';
$valid_file = true;





if ($intent == 'checkAvatarExists') {
    
    $sql = "SELECT userAvatarPath FROM User WHERE userName = '" . $fileName . "'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            
            if($row['userAvatarPath'] === null) {
                echo false;
            } 
            else {
                echo true;
            }
        }   
    }
    else {
        echo false;
    }
    
}

?>