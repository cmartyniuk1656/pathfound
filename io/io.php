<?php
 $dir = $_SERVER['DOCUMENT_ROOT'];
 $obj = $_POST['myData'];
 $fileName = $_POST['myDestination'];
 $objType = $_POST['myType'];
 $reqType = $_POST['requestType'];
 $path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName;


if ($reqType == 'post') {
    
     // create new directory with 744 permissions if it does not exist yet
 // owner will be the user/group the PHP script is run under
 if ( !file_exists($dir) ) {
     $oldmask = umask(0);  // helpful when used in linux server  
     mkdir ($dir, 0744);
 }

 file_put_contents ($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName, $obj); 

}

else if ($reqType == 'get') {
    
    if (file_exists($path)) {
        
        echo "The file $fileName exists";
        $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $fileName);
        
    } 
    
    else {
        
        echo "The file $fileName does not exist";
    }
    
}