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
    
//    if ($resultUserId->num_rows > 0) {
//    
//        $userId = mysqli_fetch_array($resultUserId);
//        
//        $gameRoomIdSql = "SELECT gameRoomID FROM GameRoomMember WHERE userID = '" . $userId[0] . "'";
//        
//        $resultGameRoomId = $conn->query($gameRoomIdSql);
//        
//        if ($resultGameRoomId->num_rows > 0) { 
//            
//            
//            for ($x = 0; $x <= $resultGameRoomId->num_rows; $x++) {
//                
//                $sql = "SELECT gameRoomName, gameRoomJSONPath, gameRoomDescription, gameRoomSchedule, gameRoomUrlCode FROM GameRoom WHERE gameRoomID = '". $resultGameRoomId[$x] . "'";
//                $result = $conn->query($sql);
//                $r = mysqli_fetch_assoc($result);
//                $rows[] = $r;
//                
//            } 
//            
//            echo json_encode($rows);
//            
//            
////            $result = $conn->query($sql);
//            
//        }
//        
//        else {
//        echo "Error: " . $resultGameRoomId . " " . $conn->error;
//    }
//        
//    }
//        
//        
//    else {
//        echo "Error: " . $resultUserId . " " . $conn->error;
//    }
    
    

//    $sql = "SELECT gameRoomName, gameRoomJSONPath, gameRoomDescription, gameRoomSchedule, gameRoomUrlCode FROM GameRoom WHERE dungeonMasterID = '1'";

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
    
    
//    if ($result->num_rows > 0) {
//        // output data of each row
//        while($row = $result->fetch_assoc()) {
//            roomNames=[] = $row['gameRoomName'];
//        }
//    } 
//    else {
//        //echo json_encode($result);
//    }
//    
//    
//    echo json_encode($result);
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



/* our multidimentional php array to pass back to javascript via ajax */
//$arr = array(
//        array(
//                "first_name" => "Darian",
//                "last_name" => "Brown",
//                "age" => "28",
//                "email" => "darianbr@example.com"
//        ),
//        array(
//                "first_name" => "John",
//                "last_name" => "Doe",
//                "age" => "47",
//                "email" => "john_doe@example.com"
//        )
//);

/* encode the array as json. this will output [{"first_name":"Darian","last_name":"Brown","age":"28","email":"darianbr@example.com"},{"first_name":"John","last_name":"Doe","age":"47","email":"john_doe@example.com"}] */
