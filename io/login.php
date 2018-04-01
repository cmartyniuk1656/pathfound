<?php
$servername = "pathfound.ca";
$username = "pathfound";
$password = "toaster100";

$intent = $_POST['intent'];
$usernameInput = $_POST['user'];

// Create connection
$conn = new mysqli($servername, $username, $password, "testbasepathfound");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//Logic for login
if ($intent == "login") {
    
    $userPasswordInput = $_POST['password'];
    
    $sql = "SELECT userPassword FROM User WHERE userName = '" . $usernameInput . "' AND userPassword = '" . $userPasswordInput . "'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo true;
        }
    } 
    else {
        echo "0 results";
    }
    
    $conn->close();
    
}

else if ($intent == "checkUserExists") {
    
    $sql = "SELECT userName FROM User WHERE userName = '" . $usernameInput . "'";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo true;
        }
    } 
    else {
        echo "No results";
    }
    
    $conn->close();
}

else if ($intent == "createNewUser") {
    
    $userPasswordInput = $_POST['password'];
    
    $sql = "INSERT INTO User (userName, userPassword)
            VALUES ('" . $usernameInput . "', '" . $userPasswordInput . "')";
    
    if ($conn->query($sql) === TRUE) {
        echo true;
    }   
    else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

$conn->close();
    
}



?>