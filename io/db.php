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

//Logic for creating a game
if ($intent == "createGame") {
    
    $gameName = $_POST['name'];
    $schedule = $_POST['schedule'];
    $description = $_POST['description'];
    $urlCode = $_POST['urlCode'];
    $jsonPath = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/gameroom/' . $urlCode;
    
    $userIdSql = "SELECT userID FROM User WHERE userName = '" . $usernameInput . "'";
    
    $resultId = $conn->query($userIdSql);
    
    if ($resultId->num_rows > 0) {
        
        $userId = mysqli_fetch_array($resultId);
        
        $sql = "INSERT INTO GameRoom (dungeonMasterID, gameRoomName, gameRoomJSONPath, gameRoomDescription, gameRoomSchedule, gameRoomUrlCode)
            VALUES ('" . $userId[0] . "', '" . $gameName . "', '". $jsonPath . "', '" . $description . "', '" . $schedule . "', '" . $urlCode. "')";
    
        if ($conn->query($sql) === TRUE) {
            echo "Success";
        }   
        else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        
        
        
    }   
    else {
        echo "Error: retrieving userID";
    }
     

$conn->close();
    
}

else if ($intent == "checkGameExists") {
    
    $gameString = $_POST['game'];
    
    $sql = "SELECT gameRoomUrlCode FROM GameRoom WHERE gameRoomUrlCode = '" . $gameString . "'";
    
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo true;
        }
    } 
    else {
        echo false;
    }

$conn->close();
    
}
?>