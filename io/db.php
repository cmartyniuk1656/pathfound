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
        
        $newRoomIdQuery = "SELECT gameRoomID FROM GameRoom WHERE gameRoomUrlCode = '" . $urlCode . "'";
        $resultGameRoomId = $conn->query($newRoomIdQuery);
        
        if ($resultGameRoomId->num_rows > 0) { 
            
            $gameRoomId = mysqli_fetch_array($resultGameRoomId);
            
            $sqlGameRoomId = "INSERT INTO GameRoomMember (gameRoomID, userID)
            VALUES ('" . $gameRoomId[0] . "', '" . $userId[0] . "')";
            
            if ($conn->query($sqlGameRoomId) === TRUE) {
            echo "Success";
                
            }   
            else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }

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
            if($row != null) {
                echo $row;
            }
            else {
                echo false;
            }
        }
    } 
    else {
        "Error: " . $sql . "<br>" . $conn->error;
    }

$conn->close();
    
}


else if ($intent == "checkGameExistsForJoin") {
    
    $gameString = $_POST['game'];
    
    $sql = "SELECT * FROM GameRoom WHERE gameRoomUrlCode = '" . $gameString . "'";
    
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

else if ($intent == "enterGame") {
    
    $gameString = $_POST['game'];
    
    $userIdSql = "SELECT userID FROM User WHERE userName = '" . $usernameInput . "'";
    $gameRoomId = "SELECT gameRoomID FROM GameRoom WHERE gameRoomUrlCode = '" . $gameString . "'";
    
    $resultUserId = $conn->query($userIdSql);
    $resultGameRoomId = $conn->query($gameRoomId);
    
    
    if ($resultUserId->num_rows > 0) {
        
        if ($resultGameRoomId->num_rows > 0) {
            $userId = mysqli_fetch_array($resultUserId);
            $gameRoomIDd = mysqli_fetch_array($resultGameRoomId);
            
            $inRoomAlreadySql = "SELECT * FROM GameRoomMember WHERE userID = '" . $userId[0] . "' AND gameRoomID = '" . $gameRoomIDd[0] . "'";
            $resultAlreadyInRoom = $conn->query($inRoomAlreadySql);
            
            if ($resultAlreadyInRoom->num_rows > 0) {
                echo false;
                $conn->close();
            }
            
            else if($resultAlreadyInRoom->num_rows == 0) {
                
                $sql = "INSERT INTO GameRoomMember (gameRoomID, userID)
                VALUES ('" . $gameRoomIDd[0] . "', '" . $userId[0] . "')";
            
                if ($conn->query($sql) === TRUE) {
                    echo true;
                }   
                else {
                    echo "Error: " . $sql . "<br>" . $conn->error;
                }
                
            }
        
        }
        
        else {
            echo "Error: " . $gameRoomId . "<br>" . $conn->error;
        }
         
    }   
    
    else {
        echo "Error: " . $resultUserId . " " . $conn->error;
    }

    $conn->close();
    
    
}
?>