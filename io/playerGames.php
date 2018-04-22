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
    
    $obj = json_decode($_POST['gameId']);
    
    $gameIdList = $obj->ids->gameIds; 
    $gameObjects = array();
    $size = sizeof($gameIdList);
    
    for ($x = 0; $x <= $size-1; $x++) { 

        $sql = "SELECT gameRoomName, gameRoomDescription, gameRoomSchedule, gameRoomUrlCode FROM GameRoom WHERE gameRoomID = ' " .  $gameIdList[$x]->gameRoomID . "'";
        
        $result = $conn->query($sql);
        

        while($r = mysqli_fetch_assoc($result)) {
            array_push($gameObjects, $r);
        }
        
        
    }
      $returnObj = json_encode($gameObjects);

      echo $returnObj;
}

else if ($intent == 'getMapImages') {
    

    $sql = "SELECT imagePath FROM MapImages WHERE userName = '" . $usernameInput . "'";
    $result = $conn->query($sql);
    
    
    if ($result->num_rows > 0) {
        
        $rows = array();
        
//        while($r = mysqli_fetch_assoc($result)) {
//            $rows[] = $r;
//        }  
        
        while($r = mysqli_fetch_assoc($result)) {
            array_push($rows, $r);
        }
    
        echo json_encode($rows);
        
    }
    else {
        echo false;
    }
    
    
    $conn->close();
    
}

else if ($intent == 'getUserImages') {
    
    $userIdSql = "SELECT userID FROM User WHERE userName = '" . $usernameInput . "'";
    $resultId = $conn->query($userIdSql);
    
    $userIds = mysqli_fetch_array($resultId);
    $userId = $userIds[0];

    $sql = "SELECT imagePath FROM UserImages WHERE userID = '" . $userId . "'";
    $result = $conn->query($sql);
    
    
    if ($result->num_rows > 0) {
        
        $rows = array();
        
//        while($r = mysqli_fetch_assoc($result)) {
//            $rows[] = $r;
//        }  
        
        while($r = mysqli_fetch_assoc($result)) {
            array_push($rows, $r);
        }
    
        echo json_encode($rows);
        
    }
    else {
        echo false;
    }
    
    
    $conn->close();
    
}

?>
