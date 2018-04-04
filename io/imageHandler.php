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
 $fileName = $_POST['userName'];
 $path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/avatar/';
 $valid_file = true;


if ($intent == 'updateUserImage') {
    
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
                    
                    $sql = "INSERT INTO User userAvatarPath WHERE userName = '" . $username . "' 
                    VALUES ('" . $target . ".jpg" . "')";
                    
                    if ($conn->query($sqlGameRoomId) === TRUE) {
                        echo "Success";
                    }   
                    else {
                        error_log("Error: " . $sql . "<br>" . $conn->error);
                    }
                    
                    $conn->close();
                } 
            }
            
            else {
                error.log();
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
    
