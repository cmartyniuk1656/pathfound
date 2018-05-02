<?php
 $dir = $_SERVER['DOCUMENT_ROOT'];
 $obj = $_POST['myData'];
 $fileName = $_POST['myDestination'];
 $objType = $_POST['myType'];
 $reqType = $_POST['requestType'];
 $path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName;
 $charPath = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName;


if ($reqType == 'post') {
    
 // create new directory with 744 permissions if it does not exist yet
 // owner will be the user/group the PHP script is run under
// if ( !file_exists($path) ) {
//     $oldmask = umask(0);  // helpful when used in linux server  
//     mkdir ($dir, 0744);
// }      

 file_put_contents ($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName, $obj); 
    
    echo true;

}

else if ($reqType == 'get') {
    
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName)) {
        
//        TEST CODE START ---------------------------------------
        
        $fullPath = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName;
        
        $handle = fopen($fullPath, "r+");
        
        //Lock File, error if unable to lock
        if(flock($handle, LOCK_EX)) {
            
            $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
            flock($handle, LOCK_UN);    //Unlock File
            
        } 
        else {
            echo "Could not Lock File!";
        }
        
//        TEST CODE END------------------------------------------
        
        
//      $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
        echo $returnData;
        
    } 
    
    else {
        
        echo null;
    }
    
}   


else if ($reqType == 'read') {
    
//    $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
//    echo $returnData;
    
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName)) {
        
//        TEST CODE START ---------------------------------------
        
        $fullPath = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName;
        
        $handle = fopen($fullPath, "r+");
        
        //Lock File, error if unable to lock
        if(flock($handle, LOCK_EX)) {
            
            $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
            flock($handle, LOCK_UN);    //Unlock File
            
        } 
        else {
            echo "Could not Lock File!";
        }
        
//        TEST CODE END------------------------------------------
        
        
//      $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
        echo $returnData;
        
    } 
    
    else {
        
        echo null;
    }
    
}

else if ($reqType == 'saveCharacter') {
    
//    if ( !file_exists($charPath) ) {
//     $oldmask = umask(0);  // helpful when used in linux server  
//     mkdir ($dir, 0744);
// }     
    
    file_put_contents ($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName, $obj); 
    echo true;

}

else if ($reqType == 'getCharacterJSON') {
    
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName)) {
        
        $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
        echo $returnData;
        
    } 
    
    else {
        
        echo null;
    }
}

else if ($reqType == 'getRoomCharacterJSON') {
    
    if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName)) {
        
        $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
        echo $returnData;
        
    } 
    
    else {
        
        echo null;
    }
}

?>