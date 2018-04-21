<?php
$servername = "pathfound.ca";
$username = "pathfound";
$password = "toaster100";
http_response_code(204);


// Create connection
$conn = new mysqli($servername, $username, $password, "testbasepathfound");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

 $dir = $_SERVER['DOCUMENT_ROOT'];
 $intent = $_POST['intent'];
 $fileName = $_POST['accUserName'];
 $valid_file = true;

if ($intent == 'updateUserImage') {
    
    $path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/avatar/';
    
    //if they DID upload a file...
    if($_FILES['photo']['name']) {
        
        error_log($_FILES['photo']['size'], 0);
        
        //now is the time to modify the future file name and validate the file
		$new_file_name = strtolower($_FILES['photo']['name']); //rename file
		if($_FILES['photo']['size'] > (1024000)) //can't be larger than 1 MB
		{
			$valid_file = false;
			$message = 'Oops!  Your file\'s size is to large.';
		}
        
        //if the file has passed the test   
		if($valid_file)
		{
            
            $currentdir = getcwd();
            $target = $currentdir .'/dam/avatar/' . $fileName;
            
            if($_FILES['photo']['type'] == 'image/jpeg') {
                
                if(move_uploaded_file($_FILES['photo']['tmp_name'], $target . '.jpg')) {
                    
                    $sql = "UPDATE User 
                    SET userAvatarPath = '/io/dam/avatar/" . $fileName . ".jpg" . "' 
                    WHERE userName = '" . $fileName . "'";
                    
                    if ($conn->query($sql) === TRUE) {
                        echo "Success"; 
                    }   
                    else {
                        error_log("Error: " . $sql . "<br>" . $conn->error);
                    }
                    
                    $conn->close();
                } 
            }
            
            else {
            }
        
			
		}
        else {
            error_log('Invalid File submitted', 0);
        }
    }
        
        //if there is an error...
	else
	{
		//set that to be the returned message
		$message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['photo']['error'];
        error_log($message, 0);
	}

        
}

else if ($intent == 'checkAvatarExists') {
    
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

else if ($intent == 'addMapImage') {
    
    $path = $_SERVER['DOCUMENT_ROOT'] . '/assets/images/map/';
    
    $imageFileName = bin2hex(mcrypt_create_iv(10, MCRYPT_DEV_URANDOM));
    $imageFileName = $path . $imageFileName;
    
     //if they DID upload a file...
    if($_FILES['photo']['name']) {
        
        error_log($_FILES['photo']['size'], 0);
        
        //now is the time to modify the future file name and validate the file
		$new_file_name = strtolower($_FILES['photo']['name']); //rename file
		if($_FILES['photo']['size'] > (1024000)) //can't be larger than 1 MB
		{
			$valid_file = false;
			$message = 'Oops!  Your file\'s size is to large.';
		}
        
        //if the file has passed the test   
		if($valid_file)
		{
            
            $target = $imageFileName;
            
            if($_FILES['photo']['type'] == 'image/jpeg') {
                
                if(move_uploaded_file($_FILES['photo']['tmp_name'], $target . '.jpg')) {
                    
                    
                    $sql = "INSERT INTO MapImages (imagePath, userName) VALUES 
                    ('" . $target . ".jpg', '" . $fileName . "')";
                    
                    if ($conn->query($sql) === TRUE) {
                        echo "Success"; 
                    }   
                    else {
                        error_log("Error: " . $sql . "<br>" . $conn->error);
                    }
                    
                    $conn->close();
                } 
            }
            
            else {
            }
        
			
		}
        else {
            error_log('Invalid File submitted', 0);
        }
    }
        
        //if there is an error...
	else
	{
		//set that to be the returned message
		$message = 'Ooops!  Your upload triggered the following error:  '.$_FILES['photo']['error'];
        error_log($message, 0);
	}
    
}
    
?>