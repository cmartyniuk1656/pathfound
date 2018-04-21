<?php
header('Content-Type: application/json; charset=utf-8');

$intent = $_POST['requestType'];

function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

if ($intent == "getCharacterJSON") {
    
    $obj = json_decode($_POST['myData']);
    
    $charList = $obj->paths;
    $charObjects = array();

    foreach ($charList as &$char) {
        
        $string = str_replace(' ', '', $char);

        $path = $_SERVER['DOCUMENT_ROOT'] . "/io/dam/json/character/" . $string;
        $jsonString = file_get_contents($path);
        $data = json_decode($jsonString, true);
        array_push($charObjects, $data);
    }

    $out = array_values($charObjects);
    $returnObj = json_encode($out);

    echo $returnObj;

}

else if ($intent == 'getRoomCharacterJSON') {
    
    $obj = json_decode($_POST['myData']);

    $charList = $obj->paths;
    $charObjects = array();

    foreach ($charList as &$char) {
        
        $string = str_replace(' ', '', $char);

        $path = $_SERVER['DOCUMENT_ROOT'] . "/io/dam/json/character/" . $string;
        $jsonString = file_get_contents($path);
        $data = json_decode($jsonString, true);
        array_push($charObjects, $data);
    }

    $out = array_values($charObjects);
    $returnObj = json_encode($out);

    echo $returnObj;
    
}



?>


