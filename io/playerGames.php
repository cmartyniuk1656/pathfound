<?php

/* set out document type to text/javascript instead of text/html */
header("Content-type: text/javascript");

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
if ($intent == "getPlayerGames") {
    
    $userIdSql = "SELECT userID FROM User WHERE userName = '" . $usernameInput . "'";
    $resultUserId = $conn->query($userIdSql);
    
    $userId = mysqli_fetch_array($resultUserId);

    $sql = "SELECT gameRoomID FROM GameRoomMember WHERE userID = '" . $userId[0] . "'";
    $result = $conn->query($sql);
    
    
    if ($result->num_rows > 0) {
        
        $rows = array();
        
        while($r = mysqli_fetch_assoc($result)) {
            $rows[] = $r;
        }   
    
        echo json_encode($rows);
        
    }
    else {
        echo false;
    }
    
    
    $conn->close();
    
}

else if ($intent == "getGameInfo") {
    
    $gameID = $_POST['gameId'];
    
    $sql = "SELECT gameRoomName, gameRoomDescription, gameRoomSchedule, gameRoomUrlCode FROM GameRoom WHERE gameRoomID = ' " . $gameID . "'";
    
    $result = $conn->query($sql);
    
    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    
    echo json_encode($rows);
    
}

?>
