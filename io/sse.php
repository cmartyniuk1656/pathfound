<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$roomId = $_GET["roomId"];
$path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . 'gameroom/' . $fileName;
//$objType = 'gameroom';
//$path = $_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . $roomId;


//if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType . '/' . $roomId)) {
//        $returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . $objType .'/' .  $roomId);
//        echo {$returnData};
//    } 
//    
//else {
//    echo "GAY";
//}

//$returnData = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/io/dam/json/' . 'gameroom/' . $fileName);
echo "data: {$path}";
flush();
?>

